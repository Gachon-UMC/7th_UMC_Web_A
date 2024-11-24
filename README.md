# Code Review Branch Guide

이 문서는 **코드 리뷰 브랜치 생성 및 PR 작성**을 위한 가이드를 제공합니다.

<br>

## 1️⃣ week8 미션3 프로젝트 복사
- Week8의 **미션3 프로젝트 폴더**를 복제합니다.
- 복제한 폴더의 이름을 `{닉네임}-project` 형식으로 수정합니다.

<br>

## 2️⃣ 코드 리뷰 브랜치 생성
아래 명령어를 사용하여 `{닉네임}-code-review` 형식의 브랜치를 생성합니다.  
명령어를 하나씩 차례로 실행하세요:
```bash
git fetch origin
git switch code-review
git branch {닉네임}-code-review
git switch {닉네임}-code-review
```

<br>

## 3️⃣ 복사한 미션3 프로젝트 폴더 붙여넣기
- 1번에서 복제했던 미션3 폴더를 로컬 저장소에 붙여넣습니다.
- 폴더를 붙여넣은 후 Git에서 변경 사항을 확인합니다:
```bash
git status
```

<br>

## 4️⃣ 변경 사항 커밋 및 PR 작성
1. 변경 사항 스테이징 및 커밋:
```bash
git add .
git commit -m "add week8 mission3 project"
```
2. 원격 저장소로 푸시:
```bash
git push origin {닉네임}-code-review
```
3. Pull Request(PR) 생성:
- GitHub에서 새 PR을 작성합니다.
- PR 작성 시 Base 브랜치를 code-review로 설정합니다.

<br>

## 참고 사항
- 브랜치 이름은 반드시 {닉네임}-code-review 형식을 따르세요.
- Base 브랜치가 code-review로 설정되었는지 꼭 확인하세요.