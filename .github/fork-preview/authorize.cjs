// The triggering workflow and its title can come from the fork. Use the title only
// to locate GitHub records, then authorize the operation using the API response.
module.exports = async ({ github, context }) => {
  const run = context.payload.workflow_run;
  const match = /^Fork preview PR ([1-9]\d*) review (closed|[1-9]\d*)$/.exec(run.display_title);
  if (!match || run.path !== '.github/workflows/fork-preview-build.yml') return;
  const pull_number = Number(match[1]);
  const repo = context.repo;
  const { data: pr } = await github.rest.pulls.get({ ...repo, pull_number });
  if (pr.base.repo.id !== context.payload.repository.id || pr.base.ref !== 'main' ||
      pr.head.repo?.id === pr.base.repo.id) return;

  if (match[2] === 'closed') {
    if (run.event === 'pull_request' && pr.state === 'closed') {
      return { operation: 'delete-preview', number: pull_number };
    }
    return;
  }
  if (run.event !== 'pull_request_review' || run.conclusion !== 'success' ||
      pr.state !== 'open' || !pr.head.repo || run.head_repository?.id !== pr.head.repo.id ||
      run.head_branch !== pr.head.ref || run.head_sha !== pr.head.sha) return;

  const { data: review } = await github.rest.pulls.getReview({
    ...repo, pull_number, review_id: Number(match[2]),
  });
  if (review.state !== 'APPROVED' || review.commit_id !== pr.head.sha ||
      review.user.type !== 'User' || review.user.id !== run.actor.id) return;
  const { data: collaborator } = await github.rest.repos.getCollaboratorPermissionLevel({
    ...repo, username: review.user.login,
  });
  if (!['admin', 'write'].includes(collaborator.permission)) return;

  // A later request for changes supersedes this review, even on the same SHA.
  const reviews = await github.paginate(github.rest.pulls.listReviews, { ...repo, pull_number, per_page: 100 });
  const latest = reviews.filter(item => item.user.id === review.user.id &&
    ['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(item.state)).at(-1);
  if (latest?.id !== review.id) return;
  return { operation: 'deploy', number: pull_number, sha: review.commit_id };
};
