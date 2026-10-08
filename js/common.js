document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");

    if (header) {
        header.innerHTML = `
            <header class="header">
                <div class="header-inner">
                    <h1 class="logo">
                        <a href="./index.html">
                            <span class="logo-icon">
                                <img src="./img/LOGO IMG.png" alt="INFO THIEF">
                            </span>
                            <span class="logo-text">INFO THIEF</span>
                        </a>
                    </h1>
                    <nav class="gnb">
                        <ul>
                            <li><a href="./about.html">ABOUT</a></li>
                            <li><a href="./check.html">CHECK</a></li>
                            <li><a href="./case.html">CASE</a></li>
                            <li><a href="./tip.html">TIP</a></li>
                            <li><a href="./campaign.html">CAMPAIGN</a></li>
                        </ul>
                    </nav>
                    <div class="header-util">
                        <button type="button" class="search-btn" aria-label="검색">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="10.8" cy="10.8" r="7.3"></circle>
                                <line x1="16.2" y1="16.2" x2="22" y2="22"></line>
                            </svg>
                        </button>
                        <button type="button" class="menu-btn" aria-label="메뉴 열기">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
        `;
    }

    const footer = document.querySelector("#footer");

    if (footer) {
        footer.innerHTML = `
            <footer class="footer">
                <div class="footer-inner">
                    <div class="footer-brand">
                        <a href="./index.html" class="footer-logo">
                            <img src="./img/LOGO IMG.png" alt="INFO THIEF">
                            <span>INFO THIEF</span>
                        </a>
                        <p>누군가 내 정보를 훔쳐보고 있다.</p>
                    </div>
                    <nav class="footer-nav">
                        <a href="./about.html">ABOUT</a>
                        <a href="./check.html">CHECK</a>
                        <a href="./case.html">CASE</a>
                        <a href="./tip.html">TIP</a>
                        <a href="./campaign.html">CAMPAIGN</a>
                    </nav>
                    <div class="footer-info">
                        <p>PERSONAL INFORMATION PROTECTION PROJECT</p>
                        <p>© 2026 INFO THIEF. ALL RIGHTS RESERVED.</p>
                    </div>
                </div>
            </footer>
        `;
    }
});