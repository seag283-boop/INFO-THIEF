/* ========================================
   CASE PAGE
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       ELEMENT
    ======================================== */

    const filterButtons = document.querySelectorAll(".filter-button");
    const caseCards = document.querySelectorAll(".case-card");

    const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
    const modals = document.querySelectorAll(".case-modal");

    const moreButton = document.querySelector(".case-more-button");


    /* ========================================
       FILTER
    ======================================== */
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filterMap = {
                all: ["sns", "shopping", "game", "finance", "app", "cctv", "used", "wifi"],
                sns: ["sns"],
                shopping: ["shopping", "used"],
                game: ["game"],
                finance: ["finance", "app"],
                public: ["cctv", "wifi"]
            };

            const categories = filterMap[filter] || [];

            caseCards.forEach((card) => {
                const category = card.dataset.category;

                if (categories.includes(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });


    /* ========================================
       ARTICLE DATA
    ======================================== */

    const articleData = {

        case01: {
            source: "SBS 뉴스",
            title: "SNS에 올린 위치 보고 스토킹까지.. 개인정보 '줄줄'",
            date: "2013.08.28",
            description: "SNS에 공개한 위치정보를 통해 다른 사람이 이용자의 위치와 개인정보를 확인하고 스토킹까지 이어질 수 있었던 사례를 다룬 기사입니다.",
            link: "https://news.sbs.co.kr/news/endPage.do?news_id=N1001953713"
        },

        case02: {
            source: "뉴시스",
            title: "[연휴 보안 꿀팁②] 택배상자 송장 꼭 떼서 버리세요.",
            date: "2022.09.09",
            description: "택배 송장에 적힌 이름, 연락처, 주소 등의 개인정보가 노출되고 범죄에 이용된 실제 사례를 다룬 기사입니다.",
            link: "https://www.newsis.com/view/NISX20220906_0002005378"
        },

        case05: {
            source: "연합뉴스",
            title: "API 활용 확대에 따른 개인정보 유출 예방",
            date: "2026.07.08",
            description: "API 권한 관리가 제대로 이루어지지 않을 경우 개인정보가 대규모로 유출될 수 있는 사례와 예방 방법을 소개한 자료입니다.",
            link: "https://www.yna.co.kr/view/AKR20260708049700530"
        },

        case08: {
            source: "ZDNet Korea",
            title: "해커도 기다리는 여름휴가…개인정보 유출 '주의보'",
            date: "2025.07.03",
            description: "여행지의 공공 Wi-Fi 등 보안이 취약한 네트워크를 이용할 때 개인정보가 노출될 수 있는 위험을 다룬 기사입니다.",
            link: "https://zdnet.co.kr/view/?no=20250703133923"
        }

    };


    /* ========================================
       YOUTUBE DATA

       실제 영상 링크를 넣는 곳
    ======================================== */

    const youtubeData = {

        case03: "https://youtu.be/oHm2C55Gya0?si=XXXgswafJCZjHDh9",

        case04: "https://youtu.be/jUOaGS4iIvA?si=UVgKyyHwZ7XH-JGP",

        case06: "https://youtu.be/xwobIdfmYSc?si=EnhSBibCE92NW76j",

        case07: "https://youtu.be/3aYrlXI0lZk?si=5OMJ5iUtT0AicgaW"
    };


    /* ========================================
       OPEN MODAL BUTTON
    ======================================== */

    modalOpenButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const modalId = button.dataset.modalOpen;

            openModal(modalId);

        });

    });


    /* ========================================
       CARD CLICK
    ======================================== */

    caseCards.forEach((card) => {

        card.addEventListener("click", () => {

            const modalId = card.dataset.modal;


            if (modalId) {

                openModal(modalId);

            }

        });

    });


    /* ========================================
       OPEN MODAL
    ======================================== */

    function openModal(modalId) {

        const modal = document.getElementById(modalId);


        if (!modal) return;


        /* 기사 모달 */

        if (modal.dataset.type === "article") {

            setArticleData(modalId);

        }


        /* 영상 모달 */

        if (modal.dataset.type === "video") {

            setYoutubeData(modalId);

        }


        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    /* ========================================
       ARTICLE DATA
    ======================================== */

    function setArticleData(modalId) {

        const data = articleData[modalId];


        if (!data) return;


        const modal = document.getElementById(modalId);


        if (!modal) return;


        const source =
            modal.querySelector(".article-source");

        const title =
            modal.querySelector(".article-title");

        const date =
            modal.querySelector(".article-date");

        const description =
            modal.querySelector(".article-description");

        const link =
            modal.querySelector(".article-link");


        if (source) {

            source.textContent = data.source;

        }


        if (title) {

            title.textContent = data.title;

        }


        if (date) {

            date.textContent = data.date;

        }


        if (description) {

            description.textContent = data.description;

        }


        if (link) {

            if (data.link) {

                link.href = data.link;

                link.style.display = "";

            } else {

                link.removeAttribute("href");

                link.style.display = "none";

            }

        }

    }


    /* ========================================
       YOUTUBE DATA
    ======================================== */

    function setYoutubeData(modalId) {

        const modal =
            document.getElementById(modalId);


        if (!modal) return;


        const iframe =
            modal.querySelector(".youtube-frame");


        if (!iframe) return;


        const youtubeUrl =
            youtubeData[modalId];


        if (!youtubeUrl) {

            iframe.src = "";

            return;

        }


        const videoId =
            getYoutubeId(youtubeUrl);


        if (!videoId) {

            iframe.src = "";

            return;

        }


        iframe.src =
            `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    }


    /* ========================================
       YOUTUBE ID 추출
    ======================================== */

    function getYoutubeId(url) {

        if (!url) return null;


        const patterns = [

            /youtu\.be\/([^?&]+)/,

            /youtube\.com\/watch\?v=([^?&]+)/,

            /youtube\.com\/embed\/([^?&]+)/,

            /youtube\.com\/shorts\/([^?&]+)/

        ];


        for (const pattern of patterns) {

            const match =
                url.match(pattern);


            if (match) {

                return match[1];

            }

        }


        return null;

    }


    /* ========================================
       MODAL CLOSE
    ======================================== */

    modals.forEach((modal) => {

        const closeButton =
            modal.querySelector(".modal-close");


        /* 닫기 버튼 */

        if (closeButton) {

            closeButton.addEventListener("click", () => {

                closeModal(modal);

            });

        }


        /* 모달 바깥쪽 클릭 */

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeModal(modal);

            }

        });

    });


    /* ========================================
       CLOSE MODAL
    ======================================== */

    function closeModal(modal) {

        if (!modal) return;


        modal.classList.remove("active");

        document.body.classList.remove("modal-open");


        /* 유튜브 영상 정지 */

        const iframe =
            modal.querySelector(".youtube-frame");


        if (iframe) {

            iframe.src = "";

        }

    }


    /* ========================================
       ESC KEY
    ======================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;


        modals.forEach((modal) => {

            if (modal.classList.contains("active")) {

                closeModal(modal);

            }

        });

    });


    /* ========================================
       MORE BUTTON
    ======================================== */
    if (moreButton) {
        moreButton.addEventListener("click", () => {
            const extraCases = document.querySelectorAll(".extra-case");

            extraCases.forEach((card) => {
                card.style.display = "block";
            });

            moreButton.style.display = "none";

            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth"
                });
            }, 100);
        });
    }
});