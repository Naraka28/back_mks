param (
    [string]$name
)

cd .\$name
mkdir "dto","entity"
cd .\entity
New-Item "$name.entity.ts"
cd ..
cd .\dto
New-Item "create-$name.dto.ts"

