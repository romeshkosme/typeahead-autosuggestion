import { get } from "./fetch";

const DEBOUNCE_TIMER = 800;
let timer: ReturnType<typeof setTimeout>;
const KEY_ARROW_ACTIONS = ["ArrowDown", "ArrowUp"];
const SUGGESTIONS: any[] = [];
let current = -1;
const MAX_SUGGESTION_LIMIT = 5;

export const handleSearch = (element: HTMLInputElement) => {
    element.addEventListener("keyup", (e) => {
        if (KEY_ARROW_ACTIONS.includes(e.key)) {
            handleUpDown(e.key);
        } else {
            search(e);
        }
    });
    element.focus();
}

function handleUpDown(key: string) {
    if (key ==="ArrowDown") {
        current++;
        if (current === SUGGESTIONS.length) current = 0;
        for (let index = 0; index < SUGGESTIONS.length; index++) {
            const element = document.getElementById(`item-${index}`);
            if (current === index) {
                element?.classList.add("active");
            } else {
                element?.classList.remove("active");
            }
        }
    }
}

export const debounce = (cb: Function) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        cb();
    }, DEBOUNCE_TIMER);
}

export const search = (e: KeyboardEvent) => {
    const query = (e.target as HTMLInputElement).value;
    current = -1;
    if (query) debounce(test);
    else {
        clearTimeout(timer);
        SUGGESTIONS.length = 0;
        handleSuggestionDropdown();
    }
    async function test() {
        const products: any = await get(query);
        if (products && products.length > 0) {
            SUGGESTIONS.length = 0;
            SUGGESTIONS.push(...products);
            handleSuggestionDropdown();
        } else {
            SUGGESTIONS.length = 0;
        }
    }
}

const handleSuggestionDropdown = () => {
    let suggestionHTML = ``;
    let counter = 0;
    for (const product of SUGGESTIONS) {
       suggestionHTML += `
            <div class="suggestion-list-item" id="item-${counter++}">
                <span>${product.title}</span>
            </div>
       `;
       if (counter === MAX_SUGGESTION_LIMIT) break;
    }
    const element: any = document.getElementById("suggestions");
    element.innerHTML = suggestionHTML;
    if (SUGGESTIONS.length === 0) element.style.display = "none";
    else element.style.display = "block";
}