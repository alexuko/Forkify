export const elements = {

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'), 
    searchResultList: document.querySelector('.results__list')
}

const elemntStrings = {
    loader: 'loader'
};

export const renderTheLoader = parent => {
    const loader = `
    <div class="${elemntStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elemntStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};