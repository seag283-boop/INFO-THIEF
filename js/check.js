document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       기본 설정
    ========================= */

    const totalQuestions = 10;

    let currentIndex = 0;

    // 각 문제의 답 저장
    // null = 아직 선택하지 않음
    const answers = new Array(totalQuestions).fill(null);


    /* =========================
       요소 선택
    ========================= */

    const testTrack = document.querySelector("#testTrack");

    const questionCards = document.querySelectorAll(".question-card");

    const answerButtons = document.querySelectorAll(".answer-button");

    const prevButton = document.querySelector(".slider-prev");

    const nextButton = document.querySelector(".slider-next");

    const questionNavItems = document.querySelectorAll(".question-nav-item");

    const currentQuestion = document.querySelector("#currentQuestion");

    const progressCurrent = document.querySelector("#progressCurrent");

    const progressTotal = document.querySelector("#progressTotal");

    const progressFill = document.querySelector("#progressFill");


    /* =========================
       전체 문제 수 표시
    ========================= */

    if (progressTotal) {
        progressTotal.textContent = totalQuestions;
    }


    /* =========================
       문제 이동
    ========================= */

    function goToQuestion(index) {

        if (index < 0) {
            index = 0;
        }

        if (index >= totalQuestions) {
            index = totalQuestions - 1;
        }

        currentIndex = index;

        updateSlider();

        updateQuestionInfo();

        updateNavigation();

        updateAnswerState();

        updateButtons();
    }


    /* =========================
       슬라이더 이동
    ========================= */

    function updateSlider() {

        if (!testTrack) return;

        testTrack.style.transform =
            `translateX(-${currentIndex * 100}%)`;
    }


    /* =========================
       현재 문제 정보
    ========================= */

    function updateQuestionInfo() {

        const questionNumber = currentIndex + 1;

        if (currentQuestion) {
            currentQuestion.textContent = questionNumber;
        }

        if (progressCurrent) {
            progressCurrent.textContent = questionNumber;
        }

        if (progressFill) {

            const progress =
                (questionNumber / totalQuestions) * 100;

            progressFill.style.width = `${progress}%`;
        }
    }


    /* =========================
       하단 번호 네비게이션
    ========================= */

    function updateNavigation() {

        questionNavItems.forEach((item, index) => {

            item.classList.toggle(
                "active",
                index === currentIndex
            );

            // 답변 완료한 문제 표시
            item.classList.toggle(
                "answered",
                answers[index] !== null
            );

        });
    }


    /* =========================
       답변 선택 상태
    ========================= */

    function updateAnswerState() {

        const currentCard =
            questionCards[currentIndex];

        if (!currentCard) return;

        const selectedAnswer =
            answers[currentIndex];

        const buttons =
            currentCard.querySelectorAll(".answer-button");

        buttons.forEach(button => {

            const answer =
                button.dataset.answer;

            const check =
                button.querySelector(".answer-check");

            if (answer === selectedAnswer) {

                button.classList.add("selected");

                if (check) {
                    check.textContent = "✓";
                }

            } else {

                button.classList.remove("selected");

                if (check) {
                    check.textContent = "";
                }
            }
        });
    }


    /* =========================
       이전 / 다음 버튼 상태
    ========================= */

    function updateButtons() {

        if (prevButton) {

            if (currentIndex === 0) {
                prevButton.classList.add("disabled");
            } else {
                prevButton.classList.remove("disabled");
            }
        }

        if (nextButton) {

            if (currentIndex === totalQuestions - 1) {

                nextButton.classList.add("finish");

                nextButton.setAttribute(
                    "aria-label",
                    "테스트 결과 보기"
                );

            } else {

                nextButton.classList.remove("finish");

                nextButton.setAttribute(
                    "aria-label",
                    "다음 질문"
                );
            }
        }
    }


    /* =========================
       답변 선택
    ========================= */

    answerButtons.forEach(button => {

        button.addEventListener("click", () => {

            const currentCard =
                button.closest(".question-card");

            if (!currentCard) return;

            const questionNumber =
                Number(currentCard.dataset.question);

            const questionIndex =
                questionNumber - 1;

            const answer =
                button.dataset.answer;

            answers[questionIndex] = answer;

            updateAnswerState();

            updateNavigation();

            button.classList.add("selected");

        });

    });


    /* =========================
       다음 문제
    ========================= */

    function nextQuestion() {

        // 현재 문제 답변 여부 확인
        if (answers[currentIndex] === null) {

            showAnswerWarning();

            return;
        }

        // 마지막 문제
        if (currentIndex === totalQuestions - 1) {

            finishTest();

            return;
        }

        goToQuestion(currentIndex + 1);
    }


    /* =========================
       이전 문제
    ========================= */

    function previousQuestion() {

        if (currentIndex === 0) {
            return;
        }

        goToQuestion(currentIndex - 1);
    }


    /* =========================
       다음 버튼
    ========================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextQuestion
        );

    }


    /* =========================
       이전 버튼
    ========================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousQuestion
        );

    }


    /* =========================
       하단 번호 클릭
    ========================= */

    questionNavItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            goToQuestion(index);

        });

    });


    /* =========================
       키보드 방향키
    ========================= */

    document.addEventListener("keydown", (event) => {

        // 입력창 등에 포커스가 있다면 무시
        const tagName =
            document.activeElement.tagName;

        if (
            tagName === "INPUT" ||
            tagName === "TEXTAREA" ||
            tagName === "SELECT"
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextQuestion();

        }

        if (event.key === "ArrowLeft") {

            previousQuestion();

        }

    });


    /* =========================
       스와이프
    ========================= */

    let startX = 0;

    let startY = 0;

    let currentX = 0;

    let currentY = 0;

    let isDragging = false;

    let isTouching = false;


    /* -------------------------
       터치 시작
    ------------------------- */

    testTrack.addEventListener(
        "touchstart",
        (event) => {

            const touch =
                event.touches[0];

            startX = touch.clientX;
            startY = touch.clientY;

            currentX = startX;
            currentY = startY;

            isTouching = true;

            testTrack.classList.add(
                "is-dragging"
            );

        },
        {
            passive: true
        }
    );


    /* -------------------------
       터치 이동
    ------------------------- */

    testTrack.addEventListener(
        "touchmove",
        (event) => {

            if (!isTouching) return;

            const touch =
                event.touches[0];

            currentX = touch.clientX;
            currentY = touch.clientY;

        },
        {
            passive: true
        }
    );


    /* -------------------------
       터치 종료
    ------------------------- */

    testTrack.addEventListener(
        "touchend",
        () => {

            if (!isTouching) return;

            const diffX =
                currentX - startX;

            const diffY =
                currentY - startY;

            isTouching = false;

            testTrack.classList.remove(
                "is-dragging"
            );


            // 세로 스크롤이 더 큰 경우
            // 스와이프로 인식하지 않음
            if (
                Math.abs(diffY) >
                Math.abs(diffX)
            ) {
                return;
            }


            // 최소 60px 이상 움직였을 때
            if (Math.abs(diffX) < 60) {
                return;
            }


            if (diffX < 0) {

                // 왼쪽으로 밀기
                nextQuestion();

            } else {

                // 오른쪽으로 밀기
                previousQuestion();

            }

        }
    );


    /* =========================
       PC 마우스 드래그
    ========================= */

    testTrack.addEventListener(
        "mousedown",
        (event) => {

            startX = event.clientX;
            startY = event.clientY;

            currentX = startX;
            currentY = startY;

            isDragging = true;

            testTrack.classList.add(
                "is-dragging"
            );

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (!isDragging) return;

            currentX = event.clientX;
            currentY = event.clientY;

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            if (!isDragging) return;

            const diffX =
                currentX - startX;

            const diffY =
                currentY - startY;

            isDragging = false;

            testTrack.classList.remove(
                "is-dragging"
            );


            if (
                Math.abs(diffY) >
                Math.abs(diffX)
            ) {
                return;
            }


            if (Math.abs(diffX) < 60) {
                return;
            }


            if (diffX < 0) {

                nextQuestion();

            } else {

                previousQuestion();

            }

        }
    );


    /* =========================
       텍스트 드래그 방지
    ========================= */

    testTrack.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );


    /* =========================
       답변 경고
    ========================= */

    function showAnswerWarning() {

        const currentCard =
            questionCards[currentIndex];

        if (!currentCard) return;


        // 기존 경고 제거
        const oldWarning =
            currentCard.querySelector(
                ".answer-warning"
            );

        if (oldWarning) {
            oldWarning.remove();
        }


        const warning =
            document.createElement("p");

        warning.className =
            "answer-warning";

        warning.textContent =
            "답변을 선택해주세요.";


        const answerList =
            currentCard.querySelector(
                ".answer-list"
            );

        if (answerList) {

            answerList.appendChild(
                warning
            );

        }


        // 잠깐 보여주기
        setTimeout(() => {

            warning.classList.add(
                "show"
            );

        }, 10);


        setTimeout(() => {

            warning.classList.remove(
                "show"
            );

            setTimeout(() => {

                warning.remove();

            }, 300);

        }, 1800);

    }


    /* =========================
       테스트 완료
    ========================= */

    function finishTest() {

        // 모든 문제 답변했는지 확인
        const unanswered =
            answers.findIndex(
                answer => answer === null
            );


        if (unanswered !== -1) {

            goToQuestion(unanswered);

            showAnswerWarning();

            return;
        }


        /* -------------------------
           점수 계산
           
           그렇다 = 위험 행동
           아니다 = 안전 행동
           
           그렇다 0점
           아니다 10점
        ------------------------- */

        let score = 0;

        answers.forEach(answer => {

            if (answer === "no") {

                score += 10;

            }

        });


        /* -------------------------
           결과 유형
        ------------------------- */

        let resultType = "";

        let resultTitle = "";

        if (score <= 40) {

            resultType = "초보형";

            resultTitle =
                "개인정보 보호가 조금 더 필요해요.";

        } else if (score <= 70) {

            resultType = "관심형";

            resultTitle =
                "개인정보 보호에 관심을 가져보세요.";

        } else if (score <= 90) {

            resultType = "지킴이형";

            resultTitle =
                "개인정보를 꽤 잘 지키고 있어요.";

        } else {

            resultType = "마스터형";

            resultTitle =
                "개인정보 보호 마스터예요!";

        }


        /* -------------------------
           결과 데이터 저장
        ------------------------- */

        const resultData = {

            score: score,

            type: resultType,

            title: resultTitle,

            answers: answers,

            completedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "infoThiefResult",
            JSON.stringify(resultData)
        );


        /* -------------------------
           결과 페이지 이동
        ------------------------- */

        window.location.href =
            "./result.html";

    }


    /* =========================
       초기 실행
    ========================= */

    goToQuestion(0);

});