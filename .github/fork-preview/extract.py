"""Copy regular files from a fork's artifact into a new static asset directory."""

import shutil
import stat
import sys
import zipfile
from pathlib import Path

archive, destination = map(Path, sys.argv[1:])
destination.mkdir()
with zipfile.ZipFile(archive) as site:
    entries = site.infolist()
    if len(entries) > 20_000 or sum(entry.file_size for entry in entries) > 256 * 1024**2:
        raise ValueError("Preview artifact exceeds the static site limits")
    for entry in entries:
        parts = entry.filename.rstrip("/").split("/")
        if (any(part in ("", ".", "..") for part in parts) or "\\" in entry.filename
                or not entry.filename.isprintable()):
            raise ValueError("Invalid preview asset path")
        if entry.is_dir():
            continue
        if stat.S_IFMT(entry.external_attr >> 16) not in (0, stat.S_IFREG):
            raise ValueError("Expected a regular preview asset")
        if any(part.startswith(".") for part in parts) or parts[0] in ("_headers", "_worker.js", "_routes.json"):
            continue
        target = destination.joinpath(*parts)
        target.parent.mkdir(parents=True, exist_ok=True)
        with site.open(entry) as source, target.open("xb") as output:
            shutil.copyfileobj(source, output)
if not (destination / "index.html").is_file():
    raise ValueError("Preview artifact has no index.html")
(destination / "_headers").write_text("/*\n  X-Robots-Tag: noindex\n")
