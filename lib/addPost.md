#

## Create the post

```bash

#  input request
curl --location --request POST 'http://localhost:8989/api/post/create/padosiUser-162548665057961ea925e5291' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJwYWRvc2lVc2VyLTE2MjU0ODY2NTA1Nzk2MWVhOTI1ZTUyOTEiLCJpYXQiOjE2MjU0ODY2NTB9.sdocl2OGPpA8M6hqtF_yxxTqnTQZM7EdKpdHHHNBQrU' \
--header 'Content-Type: application/json' \
--header 'Cookie: t=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJwYWRvc2lVc2VyLTE2MjU0ODY2NTA1Nzk2MWVhOTI1ZTUyOTEiLCJpYXQiOjE2MjU0ODY2NTB9.sdocl2OGPpA8M6hqtF_yxxTqnTQZM7EdKpdHHHNBQrU' \
--data-raw ' {
  "tags":["sunrise","first"],
  "postText":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste velit repellendus praesentium deserunt delectus, inventore voluptas similique alias quo quisquam voluptatibus, voluptate harum, obcaecati asperiores ipsum consectetur saepe assumenda sit quasi nobis suscipit earum? Eum facere ipsam, sint odio inventore praesentium! Nemo iure culpa veniam, debitis consequuntur sapiente enim officiis beatae reprehenderit saepe obcaecati ratione quibusdam iste non! Voluptas tempora vero magnam, culpa a debitis velit hic unde, eligendi doloribus alias, delectus similique enim iure quasi repellat ipsam aut dicta. Ullam quas saepe, enim, voluptates reiciendis expedita quam praesentium illo ab facere quaerat hic facilis libero animi adipisci obcaecati odio tempora recusandae eaque natus autem! Accusantium, repellendus quaerat aspernatur pariatur similique atque modi labore odio iste earum"
 }'
# the Expected output
{
    "statusCode": 200,
    "status": "SUCCESS",
    "message": "Success",
    "value": [
        {
            "tags": [],
            "likes": [],
            "_id": "60e2f59c5a1d56ef043cfb72",
            "postText": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste velit repellendus praesentium deserunt delectus, inventore voluptas similique alias quo quisquam voluptatibus, voluptate harum, obcaecati asperiores ipsum consectetur saepe assumenda sit quasi nobis suscipit earum? Eum facere ipsam, sint odio inventore praesentium! Nemo iure culpa veniam, debitis consequuntur sapiente enim officiis beatae reprehenderit saepe obcaecati ratione quibusdam iste non! Voluptas tempora vero magnam, culpa a debitis velit hic unde, eligendi doloribus alias, delectus similique enim iure quasi repellat ipsam aut dicta. Ullam quas saepe, enim, voluptates reiciendis expedita quam praesentium illo ab facere quaerat hic facilis libero animi adipisci obcaecati odio tempora recusandae eaque natus autem! Accusantium, repellendus quaerat aspernatur pariatur similique atque modi labore odio iste earum",
            "postedBy": {
                "_id": "60e2f53a18b200edb2b5afd6",
                "userName": "Sunrise",
                "picture": "https://robohash.org/1PU.png?set=set2&size=150x150",
                "userId": "padosiUser-162548665057961ea925e5291"
            },
            "postId": "padosiPost-162548674887523c5b6cf56e7",
            "comments": [],
            "__v": 0
        }
    ]
}

```