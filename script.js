const Info = (() => {      
    function makeRequest(keyword) {
        const request = new Request(`http://api.openweathermap.org/data/2.5/weather?q=${keyword}&APPID=976ff7a11322b7528687e32abb00ab6e`);
        return request
    }

    async function makeSearch(link) {
        const response = await fetch(link);
        const value = await response.json();
        return value
    }

    function filterInfo(fullobj) {
        let name = fullobj.name;
        let temp = (fullobj.main.temp - 273).toFixed(2);
        let tempMax = (fullobj.main.temp_max - 273).toFixed(2);
        let tempMin = (fullobj.main.temp_min - 273).toFixed(2);
        let weather = fullobj.weather[0].main;

        return {name, temp, tempMax, tempMin, weather}
    }

    async function makeItHappen(keyword) {
        const response = await makeSearch(makeRequest(keyword));
        const filteredInfo = filterInfo(response);
        return filteredInfo
    }

    return {makeItHappen}

})()

const Gif =(() => {
    function makeRequest(keyWord) {
        const request = new Request(`https://api.giphy.com/v1/gifs/translate?api_key=xW8FRefY2IHdnQElKgpwqgmY6IimTX2R&s=${keyWord}`, {mode: "cors"});
        return request
    }

    async function makeSearch(link) {
        const response = await fetch(link);
        const value = response.json();
        return value
    }

    async function makeItHappen(keyWord) {
        const response = await makeSearch(makeRequest(keyWord));
        const filteredInfo = response.data.images.original.url;
        return filteredInfo
    }

    return {makeItHappen}

})()

const UI = (()=> {

    const name = document.querySelector('#name-info');
    const temp = document.querySelector('#temp-info');
    const max = document.querySelector('#max-info');
    const min = document.querySelector('#min-info');
    const image = document.querySelector('#giphy');

    function displayGif(url) {
        image.src = url;
    }

    function displayInfo(info) {
        name.textContent = info.name;
        temp.textContent = info.temp;
        max.textContent = info.tempMax;
        min.textContent = info.tempMin;
    }

    function makeItHappen(info, url) {
        displayInfo(info);
        displayGif(url);
    }

    return {makeItHappen}
})()

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const allInfos = await Info.makeItHappen(document.querySelector('#search').value);
    const url = await Gif.makeItHappen(allInfos.weather);
    UI.makeItHappen(allInfos, url);
})


