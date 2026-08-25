# Pingvin Share NGH — fork NGH Corp

Fork de [smp46/pingvin-share-x](https://github.com/smp46/pingvin-share-x) (successeur maintenu de stonith404/pingvin-share, archivé juin 2025) avec branding et contenu NGH Corp.

## Différences vs upstream

Modifications toutes localisées dans le code source, versionnées, mergeables via `git merge upstream/main` :

### i18n

- `frontend/src/i18n/translations/en-US.ts` : `home.*` strings NGH pro
  - Title : "Share files with your clients effortlessly."
  - Description : "Professional file transfer for NGH Corp — a business-grade WeTransfer alternative."
  - Bullet A : "Zero-Access Policy" / "NGH staff never access customer files. Server logs auto-purged every 24 hours..."
  - Bullet B : "Privacy" / "End-to-end confidentiality..."
  - Bullet C : "No annoying limits" / "Up to 2 GB per upload..."
- `frontend/src/i18n/translations/fr-FR.ts` : équivalents français NGH
  - Title : "Envoyez vos fichiers en toute simplicité."
  - Bullet A : "Politique zero-access" / "Les équipes NGH n'accèdent jamais aux fichiers clients..."

Autres locales (DE, IT, ES, PT, DA, NL, EL, etc.) : préservées upstream.

### Sources tsx/tsx

- `frontend/src/components/footer/Footer.tsx` : `github.com/smp46/pingvin-share-x` → `https://ngh.network`
- `frontend/src/pages/index.tsx` : bouton "Source code" URL → `https://ngh.network`
- `frontend/src/pages/admin/intro.tsx` : "buy me a coffee" URL → `https://ngh.network`
- `frontend/src/pages/admin/index.tsx` : update check endpoint désactivé (pointe endpoint mort)

### Build

- `.github/workflows/docker-build-push.yml` : simplifié pour push uniquement sur `ghcr.io/narsson/pingvin-share-ngh` (retiré Docker Hub, retiré arm64, ajouté GHA cache)

## Build & Deploy

### Trigger un build

- **Auto** : push un tag `v1.13.0-nghN` sur main
- **Manuel** : GitHub Actions → "Build and Push NGH Docker Image" → Run workflow → tag custom (ex: `v1.13.0-ngh1`)

Le workflow build multi-stage + push sur `ghcr.io/narsson/pingvin-share-ngh:TAG` en ~8-12 min.

### Deploy sur UGREEN

Éditer `/volume1/pingvin/docker-compose.yml` :

```yaml
image: ghcr.io/narsson/pingvin-share-ngh:v1.13.0-ngh1
```

Pull + recreate :
```bash
docker compose pull
docker compose up -d --force-recreate
```

## Upgrade upstream

Quand smp46/pingvin-share-x sort une nouvelle version :

```bash
cd pingvin-share-ngh
git remote add upstream https://github.com/smp46/pingvin-share-x.git  # once
git fetch upstream
git merge upstream/main
# Fix merge conflicts if any (rare — nos modifs sont ciblées)
git tag v1.14.0-ngh1
git push origin main --tags
# GitHub Actions build + push nouvelle image automatiquement
# Puis update UGREEN compose vers ce nouveau tag + docker compose up -d
```

## Fichiers modifiés (pour merge upstream)

Liste courte à surveiller lors des merges :

- `frontend/src/i18n/translations/en-US.ts` (home.*)
- `frontend/src/i18n/translations/fr-FR.ts` (home.*)
- `frontend/src/components/footer/Footer.tsx`
- `frontend/src/pages/index.tsx`
- `frontend/src/pages/admin/index.tsx`
- `frontend/src/pages/admin/intro.tsx`
- `.github/workflows/docker-build-push.yml`

Si upstream change fondamentalement la structure home page ou les fichiers ci-dessus, revalider manuellement.

## Rollback

Retourner à l'image upstream :

```yaml
image: stonith404/pingvin-share:v1.13.0  # ou smp46/pingvin-share-x:latest
```
