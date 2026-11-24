// The CI run title locates a PR. GitHub's PR, review and run records authorize it.
module.exports = async ({ github, context }) => {
  const trigger = context.payload.workflow_run;
  const match = /^PR ([1-9]\d*)(?: (approved|closed))?$/.exec(trigger.display_title);
  if (!match) return;
  const ci = trigger.path === '.github/workflows/ci-cd.yml' && trigger.event === 'pull_request' && !match[2];
  const signal = trigger.path === '.github/workflows/cloudflare-events.yml' &&
    ((trigger.event === 'pull_request_review' && match[2] === 'approved') ||
     (trigger.event === 'pull_request' && match[2] === 'closed'));
  if (!ci && !signal) return;
  const number = Number(match[1]);
  const repo = context.repo;
  const { data: pr } = await github.rest.pulls.get({ ...repo, pull_number: number });
  if (pr.base.ref !== 'main' || pr.head.repo?.id === pr.base.repo.id) return;
  if (pr.state === 'closed') {
    if (trigger.event === 'pull_request' && match[2] === 'closed') return { number, operation: 'delete-preview' };
    return;
  }
  const sha = pr.head.sha;
  const matchesHead = run => run.head_sha === sha && run.head_repository?.id === pr.head.repo?.id &&
    run.head_branch === pr.head.ref;
  if (match[2] === 'closed' || !pr.head.repo || (ci && !matchesHead(trigger))) return;

  // A review may arrive first. Either completion can pick up the successful CI run.
  let build = trigger;
  if (trigger.event === 'pull_request_review') {
    const runs = await github.paginate(github.rest.actions.listWorkflowRuns, {
      ...repo, workflow_id: 'ci-cd.yml', event: 'pull_request', head_sha: sha, per_page: 100,
    });
    build = runs.find(run => matchesHead(run) && run.display_title === `PR ${number}`);
  }
  if (build?.event !== 'pull_request' || build.conclusion !== 'success') return;

  const reviews = await github.paginate(github.rest.pulls.listReviews, { ...repo, pull_number: number, per_page: 100 });
  const latest = new Map();
  for (const review of reviews) {
    if (['APPROVED', 'DISMISSED', 'CHANGES_REQUESTED'].includes(review.state)) latest.set(review.user.id, review);
  }
  for (const review of latest.values()) {
    if (review.state !== 'APPROVED' || review.commit_id !== sha || review.user.type !== 'User') continue;
    const { data } = await github.rest.repos.getCollaboratorPermissionLevel({ ...repo, username: review.user.login });
    if (!['admin', 'write'].includes(data.permission)) continue;
    // CI and review can both signal the same build. The queued second run is a no-op.
    const comments = await github.paginate(github.rest.issues.listComments, { ...repo, issue_number: number, per_page: 100 });
    const marker = `<!-- fork-preview-run:${build.id} -->`;
    if (comments.some(c => c.user.login === 'github-actions[bot]' && c.body.startsWith(marker))) return;
    return { operation: 'deploy', number, sha, run: build.id };
  }
};
