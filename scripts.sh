echo 'request all heroes'
curl localhost:3000/heroes

echo '\n\nrequest first'
curl localhost:3000/heroes/1

echo '\n\nInsert invalid data'
curl --silent -X POST \
    --data-binary '{"invalid":"data"}' \
    localhost:3000/heroes

echo '\n\nInsert valid data'
CREATE=$(curl --silent -X POST \
    --data-binary '{"name":"Batman","age":"43","power":"Bilionarie"}' \
    localhost:3000/heroes)

ID=$(echo $CREATE | jq .id)

echo '\n\nCheck Data'
curl localhost:3000/heroes/$ID

echo "DELETE DATA"
if [$ID gt 0]; then
    curl -X DELETE \
    localhost:3000/heroes/$ID
else
    echo "Data wasn't insert"
fi