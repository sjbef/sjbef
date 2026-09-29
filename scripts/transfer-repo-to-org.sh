#!/usr/bin/env bash
# Transfer the sjbef repo from a personal account to the SJBEF GitHub org and
# repoint this checkout's origin. Run after the org exists and you are an owner.
#
# Usage: scripts/transfer-repo-to-org.sh <org> [from-owner]
set -euo pipefail

ORG="${1:?usage: $0 <org> [from-owner]}"
FROM="${2:-acferen}"
REPO="sjbef"

gh api "orgs/$ORG" --jq '.login' >/dev/null \
  || { echo "Org '$ORG' not found or not visible to $(gh api user --jq .login)"; exit 1; }

role=$(gh api "user/memberships/orgs/$ORG" --jq '.role' 2>/dev/null || true)
[ "$role" = "admin" ] || { echo "You must be an owner of '$ORG' (current role: ${role:-none}). Try: gh auth refresh -s admin:org"; exit 1; }

echo "Transferring $FROM/$REPO -> $ORG/$REPO"
gh api -X POST "repos/$FROM/$REPO/transfer" -f new_owner="$ORG" --jq '.full_name'

# Transfers are async; wait until the new location answers.
for _ in $(seq 1 30); do
  gh api "repos/$ORG/$REPO" --jq '.full_name' >/dev/null 2>&1 && break
  sleep 2
done

git remote set-url origin "https://github.com/$ORG/$REPO.git"
git remote -v
echo "Done. GitHub redirects the old URL, but other clones should run:"
echo "  git remote set-url origin https://github.com/$ORG/$REPO.git"
