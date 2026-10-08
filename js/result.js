document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       결과 데이터 가져오기
    ========================= */

    const savedResult =
        localStorage.getItem("infoThiefResult");

    // 테스트 결과가 없으면 CHECK 페이지로 이동
    if (!savedResult) {
        window.location.href = "./check.html";
        return;
    }

    const resultData =
        JSON.parse(savedResult);

    const answers =
        resultData.answers || [];


    /* =========================
       결과 계산
    ========================= */

    let score = 0;

    answers.forEach(answer => {

        // 아니다 = 개인정보를 잘 지키고 있음
        if (answer === "no") {
            score += 10;
        }

    });


    /* =========================
       결과 유형
    ========================= */

    let type = "";
    let title = "";
    let description = "";

    if (score <= 40) {

        type = "초보형";

        title =
            "개인정보 보호 습관을 만들어볼까요?";

        description =
            "아직 개인정보 보호 습관이 부족해요.<br>" +
            "작은 습관부터 하나씩 바꿔보세요.";

    } else if (score <= 70) {

        type = "관심형";

        title =
            "기본적인 보호 습관을 가지고 있지만,";

        description =
            "조금만 더 신경 쓰면<br>" +
            "더 안전하게 개인정보를 지킬 수 있어요.";

    } else if (score <= 90) {

        type = "지킴이형";

        title =
            "개인정보를 꽤 잘 지키고 있어요.";

        description =
            "평소 개인정보 보호에 관심이 많아요.<br>" +
            "지금의 습관을 계속 유지해보세요.";

    } else {

        type = "마스터형";

        title =
            "개인정보 보호 마스터예요!";

        description =
            "개인정보 보호 습관이 아주 잘 형성되어 있어요.<br>" +
            "주변 사람들에게도 안전한 습관을 알려주세요.";

    }


    /* =========================
       화면 요소
    ========================= */

    const scoreElement =
        document.querySelector("#resultScore");

    const typeElement =
        document.querySelector("#resultType");

    const titleElement =
        document.querySelector("#resultTitle");


    /* =========================
       점수 출력
    ========================= */

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }


    /* =========================
       유형 출력
    ========================= */

    if (typeElement) {

        typeElement.textContent =
            `개인정보 ${type}`;

    }


    /* =========================
       설명 출력
    ========================= */

    if (titleElement) {

        titleElement.innerHTML =
            `${title}<br>${description}`;

    }


    /* =========================
       결과 카드 선택
    ========================= */

    const typeCards =
        document.querySelectorAll(".type-card");

    typeCards.forEach(card => {

        const cardType =
            card.dataset.type;

        card.classList.remove("active");

        if (cardType === type) {

            card.classList.add("active");

        }

    });


    /* =========================
       맞춤 TIP 데이터
       
       question 번호
       0 = SNS 위치
       1 = 비밀번호
       2 = 온라인 쇼핑
       3 = 의심스러운 링크
       4 = 오래된 SNS 계정
       5 = 공공 Wi-Fi
       6 = 앱 권한
       7 = 온라인 게임
       8 = 검색 기록
       9 = 개인정보 문서
    ========================= */

    const tipData = [

        /* 01 */
        {
            question: 0,

            title:
                "위치정보 관리",

            description:
                "SNS에 위치가 포함된 사진은 주의해요.",

            image:
                "./img/result/위치정보 관리.png"
        },


        /* 02 */
        {
            question: 1,

            title:
                "비밀번호 관리",

            description:
                "사이트마다 다른 비밀번호를 사용해요.",

            image:
                "./img/result/비밀번호 관리.png"
        },


        /* 03 */
        {
            question: 2,

            title:
                "온라인 쇼핑 개인정보",

            description:
                "배송지와 주문자 정보를 확인해요.",

            image:
                "./img/result/안전한 온라인 쇼핑 결제 아이콘.png"
        },


        /* 04 */
        {
            question: 3,

            title:
                "의심스러운 링크 주의",

            description:
                "출처가 불분명한 링크는 클릭하지 않아요.",

            // 실제 파일명
            image:
                "./img/result/피싱 경고 아이콘 3D 일러스트.png"
        },


        /* 05 */
        {
            question: 4,

            title:
                "사용하지 않는 계정 정리",

            description:
                "오래된 계정은 정리하거나 삭제해요.",

            image:
                "./img/result/사용하지 않는 계정 정리.png"
        },


        /* 06 */
        {
            question: 5,

            title:
                "공공 Wi-Fi 주의",

            description:
                "공공장소의 무료 Wi-Fi 사용을 주의해요.",

            image:
                "./img/result/공공 Wi-Fi.png"
        },


        /* 07 */
        {
            question: 6,

            title:
                "앱 권한 확인",

            description:
                "앱 설치 시 접근 권한을 꼭 확인해요.",

            image:
                "./img/result/앱 권한 확인.png"
        },


        /* 08 */
        {
            question: 7,

            title:
                "온라인 게임 개인정보",

            description:
                "게임에서 개인정보를 다른 사람에게 알려주지 않아요.",

            image:
                "./img/result/게임 보안 컨트롤러 일러스트.png"
        },


        /* 09 */
        {
            question: 8,

            title:
                "검색 기록 관리",

            description:
                "검색 기록과 방문 기록을 주기적으로 정리해요.",

            // 실제 파일명
            image:
                "./img/result/브라우저 기록 정리 아이콘.png"
        },


        /* 10 */
        {
            question: 9,

            title:
                "개인정보 문서 삭제",

            description:
                "개인정보가 포함된 문서는 안전하게 폐기해요.",

            image:
                "./img/result/개인정보 문서.png"
        }

    ];


    /* =========================
       위험한 답변 찾기
       
       "그렇다" = 개인정보 보호가
       필요한 행동을 하고 있음
    ========================= */

    const dangerTips = [];

    answers.forEach((answer, index) => {

        if (answer === "yes") {

            const tip =
                tipData.find(
                    item =>
                        item.question === index
                );

            if (tip) {

                dangerTips.push(tip);

            }

        }

    });


    /* =========================
       맞춤 TIP 선정
       
       위험한 항목을 먼저 보여주고
       부족하면 기본 TIP으로 채움
       
       최대 5개
    ========================= */

    let selectedTips =
        dangerTips.slice(0, 5);


    if (selectedTips.length < 5) {

        const remainingTips =
            tipData.filter(tip => {

                return !selectedTips.some(
                    selected =>
                        selected.question === tip.question
                );

            });

        selectedTips = [
            ...selectedTips,
            ...remainingTips
        ].slice(0, 5);

    }


    /* =========================
       TIP 화면 출력
    ========================= */

    const tipItems =
        document.querySelectorAll(".tip-item");


    tipItems.forEach((item, index) => {

        const tip =
            selectedTips[index];


        /* TIP이 없으면 숨김 */

        if (!tip) {

            item.style.display =
                "none";

            return;

        }


        /* TIP 표시 */

        item.style.display =
            "flex";


        /* =========================
           이미지
        ========================= */

        const image =
            item.querySelector(
                ".tip-image img"
            );

        if (image) {

            image.src =
                tip.image;

            image.alt =
                tip.title;

            // 이미지 로딩 실패 확인
            image.onerror = () => {

                console.warn(
                    "이미지를 찾을 수 없습니다:",
                    tip.image
                );

            };

        }


        /* =========================
           제목
        ========================= */

        const tipTitle =
            item.querySelector(
                ".tip-text h3"
            );

        if (tipTitle) {

            tipTitle.textContent =
                tip.title;

        }


        /* =========================
           설명
        ========================= */

        const tipDescription =
            item.querySelector(
                ".tip-text p"
            );

        if (tipDescription) {

            tipDescription.textContent =
                tip.description;

        }

    });


    /* =========================
       다시 테스트하기
    ========================= */

    const retryButton =
        document.querySelector(
            "#retryButton"
        );


    if (retryButton) {

        retryButton.addEventListener(
            "click",
            () => {

                // 기존 결과 삭제
                localStorage.removeItem(
                    "infoThiefResult"
                );

                // 테스트 처음으로 이동
                window.location.href =
                    "./check.html";

            }
        );

    }


    /* =========================
       결과 데이터 업데이트
    ========================= */

    const finalResult = {

        score:
            score,

        type:
            type,

        title:
            title,

        description:
            description,

        answers:
            answers,

        tips:
            selectedTips.map(
                tip => tip.title
            ),

        completedAt:
            resultData.completedAt ||
            new Date().toISOString()

    };


    localStorage.setItem(
        "infoThiefResult",
        JSON.stringify(finalResult)
    );


    /* =========================
       콘솔 확인
    ========================= */

    console.log(
        "INFO THIEF TEST RESULT"
    );

    console.log(
        "----------------------"
    );

    console.log(
        "점수:",
        score
    );

    console.log(
        "유형:",
        type
    );

    console.log(
        "답변:",
        answers
    );

    console.log(
        "맞춤 TIP:",
        selectedTips
    );

});