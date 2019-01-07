---
title: "jekyll 설정"
excerpt: "jekyll 설정 내용"
categories:
  - etc
tags:
  - jekyll
last_modified_at: 2019-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---

지킬 설정
https://dev-yakuza.github.io/ko/jekyll/configuration/?fbclid=IwAR0c2wuTySOuHP8u1IxkP2MZ8a6a5e5E9z5IpjCx89OH5KvvuthQZKier58

# jekyll 설정
config.yml 수정

# 변수
jekyll이 기본적으로 가지고 있는 변수 가 있다.
[jekyll 홈페이지(변수)](https://jekyllrb.com/docs/variables/)

  site: 사이트 전반에 대한 정보입니다. config.yml에 설정한 정보 및 기본적으로 jekyll이 제공하는 정보가 포함되어 있습니다.
  page: 현재 페이지에 대한 정보를 가지고 있습니다. 페이지 상단에서 yml형식으로 작성한 정보가 포함되어 있습니다.
  content: layouts 폴더에 있는 layout 파일에서 사용되는 변수입니다. page에 작성된 내용이 담겨있습니다.

# site 변수
  config.yml에 원하는 변수를 선언하여 site.변수명으로 해당 변수를 사용할 수 있습니다. 상단히 많은 플로그인들이 config.yml에 플러그인에 필요한 변수들을 설정하여 사용하고 있습니다. 여기서는 전역 변수 site가 가지고 있는 변수들중 우리가 자주 사용하는 변수들만 설명합니다.

  site.time: jekyll 명령을 실행한 시간입니다. 우리는 sitemap.xml에서 갱신된 시간을 표시하기 위해서, head에서 css의 캐시를 방지하기 위한 버전으로 사용하고 있습니다.
  site.pages: posts폴더에 있는 페이지 이외에 모든 페이지를 담고 있는 변수입니다. 우리는 역시 sitemap.xml에서 post 이외에 페이지들을 표시하기 위해 사용되며, Top 하단에 표시하는 카테고리 페이지를 표시하기 위해 사용합니다.
  site.posts: posts폴더에 있는 모든 페이지를 가지고 있습니다.
  site.url: 해당 사이트의 URL입니다. 해당 사이트에 실제 URL(https://kiss9815.github.io)을 설정해서 사용합니다. bundle exec jekyll serve를 사용하여 로컬에서 테스트를 하는 경우, jekyll은 해당 URL을 무시하고 http://localhost:4000으로 설정합니다. 사이트를 실제 서버에 배포시 bundle exec jekyll build로 빌드할 때, 이 URL이 사용되여 빌드됩니다.

# page 변수
  전역 변수 page가 가지고 있는 변수들로써 page 상단에 yml 형식으로 설정한 내용이 포함되어 있습니다.

  page.title: 해당 페이지에 제목을 나타냅니다. 우리는 <head> 태그안에 <title>태그에서 사용하고 있으며, 포스트 상단에 제목과 category 페이지에서 post의 리스트를 표시할때도 사용하고 있습니다.
  page.url: 해당 페이지의 url입니다. sitemap.xml 등 페이지의 링크가 필요한 곳에서 사용하고 있습니다.
  page.date: 포스트에 할당된 날짜입니다.
  page.categories: 해당 포스트가 속한 카테고리 목록입니다.
