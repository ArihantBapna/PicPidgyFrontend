export async function makeFetchRequest(url, body) {
    let result = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }).catch(err => {console.log(err)});
    return result.json();
}
