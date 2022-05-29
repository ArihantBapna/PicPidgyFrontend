export async function makeFetchRequest(url, body) {
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    });
    return result.json();
}
