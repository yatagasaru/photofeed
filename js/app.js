let lastIndex = 0
let currPost = 1
const img = new Image()

function viewDetail(self, currIndex) {
    const dots = document.querySelector('aside dots')
    const imgUrl = self.querySelector('.cardImage img').getAttribute('data-src')
    const date = self.querySelector('.cardCaption em').textContent
    const caption = self.querySelector('.cardCaption p').textContent
    const imgNav = document.querySelector('aside #btImgNav')
    const len = posts[currIndex].length
    tinyModal.openModal('#photoModal', () => {
        currPost = 0
        if (len < 2) {
            imgNav.style.display = 'none'
            dots.innerHTML = ''
        }
        else {
            let innerDots = `<div class="dotsActive pa1 mh1 br-100"></div>`
            imgNav.style.display = 'flex'
            for (let i = 0; i < len - 1; i++) {
                innerDots += `<div class="pa1 mh1 br-100"></div>`
            }
            dots.innerHTML = innerDots
        }
        document.querySelector('aside .next').setAttribute('onclick', `next(self, ${currIndex}, ${len})`)
        document.querySelector('aside .before').setAttribute('onclick', `before(self, ${currIndex})`)
        document.querySelector('aside .cardImage img').setAttribute('src', imgUrl)
        document.querySelector('aside .cardCaption em').textContent = date
        document.querySelector('aside .cardCaption p').textContent = caption
        computeImgNav(document.querySelector('aside .cardImage img'))
    })
}

function next(self, currIndex, len) {
    const dots = document.querySelector('aside dots')
    currPost++
    if (currPost > len - 1) {
        currPost = len - 1
        return
    }
    dots.querySelectorAll('div')[currPost].className = 'dotsActive pa1 mh1 br-100'
    dots.querySelectorAll('div')[currPost - 1].className = 'pa1 mh1 br-100'

    document.querySelector('aside .cardImage img').setAttribute('src', posts[currIndex][currPost].image)
    document.querySelector('aside .cardCaption em').textContent = posts[currIndex][currPost].date
    document.querySelector('aside .cardCaption p').textContent = posts[currIndex][currPost].title
    computeImgNav(document.querySelector('aside .cardImage img'))
}

function before(self, currIndex) {
    const dots = document.querySelector('aside dots')
    currPost--
    if (currPost < 0) {
        currPost = 0
        return
    }
    dots.querySelectorAll('div')[currPost].className = 'dotsActive pa1 mh1 br-100'
    dots.querySelectorAll('div')[currPost + 1].className = 'pa1 mh1 br-100'

    document.querySelector('aside .cardImage img').setAttribute('src', posts[currIndex][currPost].image)
    document.querySelector('aside .cardCaption em').textContent = posts[currIndex][currPost].date
    document.querySelector('aside .cardCaption p').textContent = posts[currIndex][currPost].title
    
    computeImgNav(document.querySelector('aside .cardImage img'))
}

function computeImgNav(currImg) {
    document.querySelector('aside #btImgNav').style.top = Number.parseInt(getComputedStyle(currImg).height) / 2 + 'px'
}

function loadMore() {
    const main = document.querySelector('#main')
    main.removeChild(main.lastChild)

    const btLoadMore = document.createElement('div')
    btLoadMore.className = 'loadMore mt3 mb1 pa1 f7 bg-light-silver hover-bg-dark-gray white br2 pointer'
    btLoadMore.setAttribute('onclick', 'loadMore()')
    btLoadMore.innerHTML = '▼ See More'

    for (var i = lastIndex; i < lastIndex + 5; i++) {
        if (posts[i] == null || posts[i] == undefined) {
            btLoadMore.style.display = 'none'
            return
        }
        const caption = posts[i][0].title.length > 80 ? posts[i][0].title.substring(0, 80 - 3) + "..." : posts[i][0].title
        const card = document.createElement('div')
        card.className = 'photoCard pointer mt3'
        card.setAttribute('onclick', `viewDetail(this, ${i})`)
        card.innerHTML = `
                <div class="cardImage bg-moon-gray w5 h5 br2 br--top">
                    <img class="lazyload br2 br--top" data-src="${posts[i][0].image}" />
                </div>
                <div class="cardCaption bg-light-gray w5 h3 br2 pa1 br--bottom">
                    <em class="f7">${posts[i][0].date}</em>
                    <p class="f7">${caption}</p>
                </div>
            `
        main.appendChild(card)
        main.appendChild(btLoadMore)
    }
    lastIndex = i
}
(function () {
    loadMore()
})()