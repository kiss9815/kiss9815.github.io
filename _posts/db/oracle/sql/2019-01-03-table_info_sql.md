---
title: "table_info"
excerpt: "jekyll 설정 내용"
categories:
  - pending
tags:
  - jekyll
last_modified_at: 2019-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---

# 테이블 목록조회
=========================================
```sql
SELECT *
FROM all_all_tables


SELECT *
FROM dba_tables


SELECT *
FROM ALL_OBJECTS
WHERE OBJECT_TYPE = 'TABLE'

-- 접속한 계정의 테이블 목록보기
SELECT *
FROM tabs;

SELECT *
FROM USER_OBJECTS
WHERE OBJECT_TYPE = 'TABLE';

SELECT *
FROM USER_TABLES;

-- 테이블 코멘트 보기

SELECT *
FROM ALL_TAB_COMMENTS
WHERE TABLE_NAME = '테이블명'

SELECT *
FROM USER_TAB_COMMENTS;

```

# 컬럼 목록조회
=========================================
```sql
SELECT *
FROM COLS;
WHERE TABLE_NAME = '테이블명';
SELECT *
FROM ALL_TAB_COLUMNS
WHERE TABLE_NAME = '테이블명';

SELECT *
FROM USER_TAB_COLUMNS;

-- 컬럼 코멘트 보기

SELECT *
FROM USER_COL_COMMENTS;
```


# 인덱스 목록조회
=========================================
all_indexes     
all_ind_columns
all_constraints
dba_indexes
user_indexes
