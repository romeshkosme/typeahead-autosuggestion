import './style.css'
import searchIcon from '/search.svg'
import { setupCounter } from './counter.ts'
import { handleSearch } from './search.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="wrapper">
    <div id="input-group">
      <img src=${searchIcon} />
      <input type="text" class="search-input" name="search" id="search" autocomplete="off" placeholder="Search">
      <div class="suggestion-list" id="suggestions"></div>
    </div>
  </div>
`;

handleSearch(document.querySelector<HTMLInputElement>('#search')!);
