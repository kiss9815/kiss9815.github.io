---
title: "스프링 transaction 주의사항"
categories:
  - spring
tags:
  - Transactions
last_modified_at: 2019-10-25T13:00:00+09:00
toc: true
toc_sticky: true
---

## Transactions 주의사항

@Transactional 어노테이션은 Proxy기반이므로 내부 메소드 호출인 경우 트랜잭션이 적용되지 않는다. 즉 현재 클래스의 메소드가 아닌 다른 클래스의 메소드에 트랜잭션을 걸어야 한다.
서비스 메소드에만 가능!!. private 메소드에는 안됨!


참고문헌
> http://ojc.asia/bbs/board.php?bo_table=LecSpring&wr_id=500
