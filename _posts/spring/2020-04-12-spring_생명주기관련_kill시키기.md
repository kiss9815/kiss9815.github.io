# spring kill 시키기 

## SIGTERM 과 SIGKILL
```
위의 메서드들중에서 종료와 관련된 작업들은 주의할 것이 있다.

주의해야할 것은 "정상(?) 종료" 되었을 때에 호출된다는 것이다.
무슨 말이냐면 애플리케이션이 종료될 때 일반적인 인터럽트는 SIGTERM 이라는 인터럽트다.
이 인터럽트(SIGTERM)가 발생하면 이벤트로 감지하고 수행하는 작업이라는 것이다. 
SIGTERM을 정상적인 종료라고 봤을 때, 비정상 종료는 SIGKILL 이다.
리눅스에서 kill -9 옵션과 같이 강제적으로 꺼버리는 것과 윈도우에서 작업관리자가 작업을 끝내버리는 등의 인터럽트가 SIGKILL이다.
위의 예제를 따라했는데 종료 이벤트에 대한 메서드가 호출되지 않았다면 SIGKILL을 이용해서 종료했을 가능성이 높다.
혹시나하고 윈도우 환경에서 커맨드창에 ctrl + c 로 종료해보았는데 이 단축키는 SIGTERM을 발생하는 이벤트라서 온전히 종료되는 것을 아래 그림에서 볼 수 있다.
``` 

## kill 시킬시
kill -9 는 급 종료
kill -15 는 현재 프로세스 다 실행시키고 종료

참고문헌
> https://jeong-pro.tistory.com/179 [SIGTERM 과 SIGKILL 및 스프링종료시 생명주기]
> https://heowc.dev/2018/12/27/spring-boot-graceful-shutdown/ [스프링boot 안전하게 종료하기]
> https://www.baeldung.com/spring-boot-shutdown [스프링 boot 종료 공식 문서]