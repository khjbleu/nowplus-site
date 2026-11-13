# 나우플러스 (NOWPLUS) 웹사이트 리뉴얼

4D 모션의자 · VR 시뮬레이터 전문기업 **나우플러스**의 원페이지 사이트입니다.
기존 Wix 사이트(nowp.co.kr)의 내용을 바탕으로 디자인과 구성을 새로 만들었습니다.

## 구성
- `index.html` — 전체 페이지 (히어로 · 4D 효과 · 강점 · 4D 시뮬레이터 상세 · VR 라인업 · 3D/4D 콘텐츠 · 시공실적 · 회사소개/인증 · FAQ · 견적요청)
- `style.css` — 다크 시네마 테마, 반응형
- `script.js` — 스크롤 애니메이션, 숫자 카운트업, VR 제품 필터, 모바일 메뉴, 견적 폼(메일 앱 연결)

빌드 과정 없이 정적 파일만으로 동작합니다.

## 이미지
현재 이미지는 기존 Wix 계정의 CDN(`static.wixstatic.com`)에서 불러옵니다.
Wix 사이트를 해지하기 전에 아래 스크립트로 이미지를 저장소 안으로 옮기세요.

```bash
./scripts/self-host-images.sh   # images/ 폴더에 내려받고 index.html 경로를 교체
```

## 배포
GitHub Pages(`main` 브랜치 루트)로 배포됩니다. 도메인 nowp.co.kr을 연결하려면
저장소 Settings → Pages → Custom domain에 입력하고, DNS에 GitHub Pages용 A/CNAME 레코드를 추가하면 됩니다.
