const url = 'https://jsonplaceholder.typicode.com/users';

export const dataItem = async () => {
    try {
        let response = await fetch(url);
        let result = await response.json();
        for await(let obj of result) {
            obj.value = obj.name;
            obj.id = typeof obj.id === 'number' ? `${ obj.id }` : obj.id;
        }

        return result;
    } catch (e) {
        console.log(e);
    }
};