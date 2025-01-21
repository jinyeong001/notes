# DevSecOps
---

DevOps(CI/CD) + Security<br>
CI(Continuous Intergration): 빌드, 테스트<br>
CD(Continuous Deployment): 배포<br><br>

## CI/CD PipeLine
CI/CD PipeLine: 빌드, 테스트, 배포를 하나로 묶음<br>
1. 버전 관리 시스템: Git, Github, Gitlab, Bitbu 등 형상관리도구<br>
2. CI 서버: Jenkins, Gitlab CI, Circle CI, Travis CI ...<br>
3. 빌드: Marven, Gradle, Ant ...<br>
4. 테스트 프레임워크: JUnit, TestNG, Selenium, Pytest ...<br>
5. 코드 품질 테스트: SonarQube, ESlink ...<br>
6. 배포: Jenkins, Gitlab CI, Spinmaker, Kubernetis ...<br>
7. 모니터링/로깅: Prometheus, Grafana, ELK Stack ...<br><br>

![DevSecOps Pipeline](notes/posts/cloud/img/devsecops.png)<br><br>

**Plan** - 보안 요구사항과 위협 모델리을 통해 초기 계획단계에서 보안 고려<br>
**Build** - 코드가 안전하게 작성되고 저장되도록 보안 검증 수행<br>
**Test** - 빌드된 애플리케이션의 보안 검증<br>
**Deploy** - 애플리케이션을 안전하게 배포<br>
**Operate** - 운영 중인 애플리케이션의 보안 유지<br>
**Monitor** - 지속적인 모니터링을 통해 보안 상태를 유지하고 개선<br><br>

## SAST(Static Application Security Testing)
: 코드가 실행되기 전의 정적 분석을 통해 코드 내부의 보안 취약점을 식별하는 소스 코드 분석 기술 및 솔루션<br>
- 사람이 직접 분석<br>
- 자동화 도구를 통해 분석<br><br>

## DAST(Dynimic Application Security Testing)
: 코드가 실행된 후의 동적 분석을 통해 프로그램의 보안 취약점을 식별하는 기술 및 솔루션

