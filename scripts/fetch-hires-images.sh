#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PARAMS="auto=format&fit=max&w=3840&q=90"

fetch() {
  local id="$1"
  local out="$2"
  echo "→ $out"
  curl -fsSL "https://images.unsplash.com/photo-${id}?${PARAMS}" -o "$out"
}

mkdir -p "$ROOT/public/images/services" "$ROOT/public/images/portfolio"

# Услуги
fetch "1497366216548-37526070297c" "$ROOT/public/images/services/partitions.jpg"
fetch "1558618666-fcd25c85cd64" "$ROOT/public/images/services/doors.jpg"
fetch "1545324418-cc1a3fa10c00" "$ROOT/public/images/services/windows.jpg"
# Витражи и фасады — curtain wall / остекление фасада
fetch "1573010304225-4a14ceacd813" "$ROOT/public/images/services/facades.jpg"
# Системы ограждений — стеклянное ограждение лестницы
fetch "1773023039870-aa1988704af3" "$ROOT/public/images/services/railings.jpg"
# Стеклянные козырьки — вход с стеклянным козырьком
fetch "1756377798975-86035d355c6d" "$ROOT/public/images/services/glass.jpg"
fetch "1560448204-e02f11c457d0" "$ROOT/public/images/services/shower.jpg"
fetch "1503387762-592deb58ef4e" "$ROOT/public/images/services/design.jpg"
# Строительная лицензия — проектная документация / чертежи
fetch "1721244654392-9c912a6eb236" "$ROOT/public/images/services/license.jpg"

# Портфолио — обложки (временно 4K сток до ваших фото)
fetch "1486325212027-8081e485255e" "$ROOT/public/images/portfolio/bmw-cover.jpg"
fetch "1566073771259-6a8506099945" "$ROOT/public/images/portfolio/maqan-cover.jpg"
fetch "1441986300917-64674bd600d8" "$ROOT/public/images/portfolio/galleria-cover.jpg"
fetch "1486325212027-8081e485255e" "$ROOT/public/images/portfolio/talgar-cover.jpg"
fetch "1700085600412-499c157f53bd" "$ROOT/public/images/portfolio/burger-king-cover.jpg"
fetch "1559339352-11d035aa65de" "$ROOT/public/images/portfolio/china-cover.jpg"

# Доп. проекты
fetch "1573010304225-4a14ceacd813" "$ROOT/public/images/portfolio/extra-1-cover.jpg"
fetch "1545324418-cc1a3fa10c00" "$ROOT/public/images/portfolio/extra-2-cover.jpg"
fetch "1600585154340-be6161a56a0c" "$ROOT/public/images/portfolio/extra-3-cover.jpg"
fetch "1497366216548-37526070297c" "$ROOT/public/images/portfolio/extra-4-cover.jpg"
fetch "1414235077428-338989a2e8c0" "$ROOT/public/images/portfolio/extra-5-cover.jpg"
fetch "1566073771259-6a8506099945" "$ROOT/public/images/portfolio/extra-6-cover.jpg"
fetch "1519494026892-80bbd2d6fd0d" "$ROOT/public/images/portfolio/extra-7-cover.jpg"
fetch "1554774853-aae0a22c8aa4" "$ROOT/public/images/portfolio/extra-8-cover.jpg"
fetch "1461896836934-ffe607ba8211" "$ROOT/public/images/portfolio/extra-9-cover.jpg"
fetch "1486406146926-c627a92ad1ab" "$ROOT/public/images/portfolio/extra-10-cover.jpg"
fetch "1521590832167-7bcbfaa6381f" "$ROOT/public/images/portfolio/extra-11-cover.jpg"
fetch "1580582932707-520aed937b7b" "$ROOT/public/images/portfolio/extra-12-cover.jpg"

# Галереи реальных проектов (до загрузки ваших фото)
fetch "1486325212027-8081e485255e" "$ROOT/public/images/portfolio/bmw-1.jpg"
fetch "1566073771259-6a8506099945" "$ROOT/public/images/portfolio/maqan-1.jpg"
fetch "1566073771259-6a8506099945" "$ROOT/public/images/portfolio/maqan-2.jpg"
fetch "1441986300917-64674bd600d8" "$ROOT/public/images/portfolio/galleria-1.jpg"
fetch "1497366216548-37526070297c" "$ROOT/public/images/portfolio/galleria-2.jpg"
fetch "1486325212027-8081e485255e" "$ROOT/public/images/portfolio/talgar-1.jpg"
fetch "1545324418-cc1a3fa10c00" "$ROOT/public/images/portfolio/talgar-2.jpg"
fetch "1700085600412-499c157f53bd" "$ROOT/public/images/portfolio/burger-king-1.jpg"
fetch "1559339352-11d035aa65de" "$ROOT/public/images/portfolio/burger-king-2.jpg"
fetch "1414235077428-338989a2e8c0" "$ROOT/public/images/portfolio/china-1.jpg"
fetch "1517248135467-4c7edcad34c4" "$ROOT/public/images/portfolio/china-2.jpg"
fetch "1555396273-367ea4eb4db5" "$ROOT/public/images/portfolio/china-3.jpg"
fetch "1559339352-11d035aa65de" "$ROOT/public/images/portfolio/china-4.jpg"

echo "Done."
