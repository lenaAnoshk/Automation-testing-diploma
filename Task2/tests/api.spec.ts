import * as helpers from '../src/helpers';
import * as testData from '../src/test-data';

describe('Check GET API requests', function () {
    it('should get all posts', async function () {
        const response = await helpers.getRequest(
            'https://jsonplaceholder.typicode.com/posts'
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testData.posts);
    })
    it('should get post with ID 1', async function () {
        const response = await helpers.getRequest(
            'https://jsonplaceholder.typicode.com//posts/1'
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testData.posts[0]);
        expect(response.body.userId).toBe(testData.posts[0].userId);
        expect(response.body.title).toBe(testData.posts[0].title);
        expect(response.body.id).toBe(testData.posts[0].id);
        expect(response.body.body).toBe(testData.posts[0].body)
    })
    it('should get post with invalid id', async function () {
        const id = 101;
        const response = await helpers.getRequest(
            'https://jsonplaceholder.typicode.com/comments?postId=1'
        );

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testData.comments);
    });
    it('GET request to invalid url', async function () {
        const error = await helpers.getRequest(
            'https://jsonplaceholder.typicode.com/post'
        );
        expect(error.statusCode).toBe(404);
    });

    it('should get comments to post with invalid id', async function () {
        const id = 101;
        const response = await helpers.getRequest(
            `https://jsonplaceholder.typicode.com/comments?postId={id}`
        );

        expect(response.body).toEqual([]);
    })
});


describe('Check PUT API requests', function () {
    it('should change post', async function () {
        const response = await helpers.putRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedPostValidTitleBody
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual(testData.changedPostValidTitleBody.title);
        expect(response.body.body).toEqual(testData.changedPostValidTitleBody.body);
    });

    it('should add only new key', async function () {
        const response = await helpers.putRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedPostNewKey
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(testData.changedPostNewKey);
    });


    it('should add empty post and leave id', async function () {
        const response = await helpers.putRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedPostEmpty
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id')
    });


    it('should change id (id should not be changed)', async function () {
        const response = await helpers.putRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedIdOfPost
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.id).not.toEqual(testData.changedIdOfPost.id);

    });

    it('shoukd add value with special charachters', async function () {
        const response = await helpers.putRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedPostSpcCharacters
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.test).toEqual(testData.changedPostSpcCharacters.test);

    });

});

describe('Check PATCH API requests', function () {
    it('should update one pair key-value', async function () {
        const response = await helpers.patchRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedBodyNoTitle
        );
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toEqual(testData.changedBodyNoTitle);
        expect(response.body.body).toEqual(testData.changedBodyNoTitle.body);
    });

    it('should change id', async function () {
        const response = await helpers.patchRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedIdOfPost
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual(testData.changedIdOfPost.id);
    });
    it('changes body and other data should be unchanged', async function () {
        const response = await helpers.patchRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedBody
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toEqual(testData.unchangedPost.id);
        expect(response.body.title).toEqual(testData.unchangedPost.title);
        expect(response.body.userId).toEqual(testData.unchangedPost.userId);
    });

    it('should return 200 if the post does not exist', async function () {
        const response = await helpers.patchRequest(
            'https://jsonplaceholder.typicode.com/posts/123456', testData.changedBody
        );
        expect(response.statusCode).toBe(200);
    });

    it('should update body to text with japan ieroglifs', async function () {
        const response = await helpers.patchRequest(
            'https://jsonplaceholder.typicode.com/posts/1', testData.changedBodyJapanIeroglifs
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.body).toEqual(testData.changedBodyJapanIeroglifs.body);
    });
});


describe('Check POST API requests', function () {
    it('should create new post, id is not sent', async function () {
        const response = await helpers.postRequest(
            'https://jsonplaceholder.typicode.com/posts', testData.newPostWithoutid
        );
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toEqual(testData.newPostWithoutid);
        expect(response.body.userId).toEqual(testData.newPostWithoutid.userId);
        expect(response.body.text).toEqual(testData.newPostWithoutid.text);
        expect(response.body.lastName).toEqual(testData.newPostWithoutid.lastName);
    });

    it('should create new post with generated new id if id that already exist is sent', async function () {
        const response = await helpers.postRequest(
            'https://jsonplaceholder.typicode.com/posts', testData.newPostWithExistedId
        );
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toEqual(testData.newPostWithExistedId);
        expect(response.body.id).toEqual(101);
    })

    it('should create new post with generated new id if new different id is sent', async function () {
        const response = await helpers.postRequest(
            'https://jsonplaceholder.typicode.com/posts', testData.newPostWithNewId
        );
        expect(response.statusCode).toBe(201);
        expect(response.body).not.toEqual(testData.newPostWithNewId);
        expect(response.body.id).toEqual(101);
    });

    it('should create new post with 20 pairs(key - value)', async function () {
        const response = await helpers.postRequest(
            'https://jsonplaceholder.typicode.com/posts', testData.newLongPost
        );
        expect(response.statusCode).toBe(201);
    });

    it('should return 500 for creation post with invalid data)', async function () {
        const error = await helpers.postRequest(
            'https://jsonplaceholder.typicode.com/posts', testData.string
        );
        expect(error.status).toBe(500);
        expect(error.response.text).toContain('Unexpected token t in JSON at position 0');
    });
})

describe('Check DELETE API requests', function () {
    it('should delete post', async function () {
        const response = await helpers.deleteRequest(
            'https://jsonplaceholder.typicode.com/posts/1'
        );
        expect(response.status).toBe(200);
    });

    it('should return error to  delete post that is not exist', async function () {
        const response = await helpers.deleteRequest(
            'https://jsonplaceholder.typicode.com/posts/999999'
        );
        expect(response.status).toBe(200);
    });

})