import superagent from 'superagent';

export async function getRequest(url: any): Promise<any> {
    try {
        return await superagent.get(url);
    } catch (error: any) {
        return error.response.res;
    }
}

export async function postRequest(url: any, data: any): Promise<any> {
    try {
        const response = await superagent
            .post(url)
            .set('Content-Type', 'application/json')
            .send(data);
        return response;
    } catch (error: any) {
        return error;
    }
}

export async function putRequest(url: any, data: any): Promise<any> {
    try {
        const response = superagent.put(url).send(data);
        return response;
    } catch (err: any) {
        return err;
    }
}

export async function patchRequest(url: any, data: any): Promise<any> {
    try {
        const response = superagent.patch(url).send(data);
        return response;
    } catch (error: any) {
        return error;
    }
}

export async function deleteRequest(url: any): Promise<any> {
    try {
        const response = superagent.delete(url);
        return response;
    } catch (err: any) {
        return err;
    }
}