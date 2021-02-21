const searchSong = async() => {
    const searchValue = document.getElementById('search-box').value;
    const url = (`https://api.lyrics.ovh/suggest/${searchValue}`)

    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError('Something went wrong!! please try again later');
    }
}

const displaySongs = (songs) => {
    const songsContainer = document.getElementById('song-container');
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = "single-result row align-items-center my-3 p-3";

        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
         </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;

        songsContainer.appendChild(songDiv);
    });
}

//display lyrics
const getLyrics = async (artist, title) => {
    // console.log(artist , title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics)
} catch (error) {
    displayError('Something went wrong!! please try again later')
}
}

const displayLyrics = (lyric) => {
    const lyricsContainer = document.getElementById('lyric-container');
    lyricsContainer.innerText = lyric;

}

//display error
const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = error;

}