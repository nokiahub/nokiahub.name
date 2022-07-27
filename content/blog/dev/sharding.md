---
date: '2022-07-27'
title: 'DB Sharding'
description: 'DB sharding이란?'
tags: 'database, sharding, distributed database'
---
sharding이란 데이터를 horizontal partitioning을 통해 나누고 각각 다른 데이터베이스에 저장하여 분산시키는 방법입니다.<br>
horizontal partitioning이란 데이터 row로 나누는 방식입니다.<br>
row로 나뉘어진 데이터베이스는 logical shard, 나눠진 데이터베이스는 physical shard입니다.<br>

## Sharding을 사용하는 이유
애플리케이션의 규모가 커지고 대규모의 트래픽에 대응하려면 데이터베이스를 스케일링해야 합니다. 스케일링을 할 때 데이터의 무결성과 보안성을 유지하는 것이 중요합니다.

- The main appeal of sharding a database is that it can help to facilitate horizontal scaling, also known as scaling out.
- 추가적인 ram이나 cpu를 통해 scale up 하는데는 데이터 스토리지 용량에 한계가 있기 때문에 scaling out 하는 것이 더 유연할 수 있습니다.

많은 양의 데이터를 하나의 데이터베이스로 관리하게 되면 다음과 같은 문제가 발생합니다.<br>
- 데이터 검색에 많은 시간이 소요된다.
- 데이터베이스가 다운되면 모든 데이터에 접근할 수 없다.

데이터베이스를 분산하여 위의 문제점을 해결할 수 있습니다.<br>

## Sharding의 단점
sharding 아키텍쳐를 적용하며 데이터가 오염이 될 수 있습니다. 바르게 sharding 아키텍쳐를 구축하였더라도 데이터베이스에 하나의 entry point를 관리하는 것보다 sharding으로 나누어진 데이터베이스를 관리하는 것에 대한 관리가 어려울 수 있습니다.<br>

## Sharding을 하려면
분산된 데이터베이스를 구분할 수 있는 유일한 키값이 있어야 한다.(pk 키 또는 샤딩 키)<br>
올바른 db를 찾을 수 있도록 라우팅되어야 한다.<br>

## Key based 샤딩
데이터의 특정 필드 값에 hash function을 적용하여 hash value를 이용해 어떤 샤드에 저장이 될 지 결정이 됩니다.<br>
hash function에 적용될 column을 샤딩 키라고 합니다.
- As you add servers, each one will need a corresponding hash value and many of your existing entries, if not all of them, will need to be remapped to their new, correct hash value and then migrated to the appropriate server.

## 모듈러 샤딩
pk를 데이터 베이스 수로 나눈 값을 pk 키로 데이터베이스를 특정합니다.<br>
데이터가 균일하게 분산되는 장점이 있습니다.<br>
데이터베이스를 추가하게되면 재정렬이 필요합니다.<br>
데이터베이스가 일정한 양으로 유지될 경우에 사용하기에 알맞습니다.<br>
균일하게 데이터베이스가 분배된다는 장점 때문에 트래픽을 안정적으로 소화할 수 있습니다.<br>

## 레인지 샤딩
pk의 범위를 기준으로 데이터베이스를 분산시키는 방식입니다.<br>
데이터베이스가 추가되어도 모듈러 샤딩과 다르게 재정렬이 필요하지 않습니다.<br>
단점은 특정 데이터베이스로 트래픽이 몰릴 수 있다는 점이 있습니다.<br>
이 때 트래픽이 몰리는 데이터베이스는 추가적인 분산 작업이 필요하고, 트래픽이 적은 데이터베이스는 통합 작업을 해야합니다.<br>

## 언제 샤딩을 해야할까?
다음과 같은 시나리오에서 샤딩을 적용해 볼 수 있습니다.<br>
- 단일 데이터베이스 노드만으로 어플리케이션 데이터를 저장할 수 없을 때
- 데이터베이스에 새로운 데이터의 생성이나 조회가 많아 응답 시 많은 시간이 소요될 때
- 어플리케이션에 필요한 네트워크 대역폭이 단일 데이터베이스 노드의 대역폭을 뛰어 넘어 많은 시간이 소요될 때

## 샤딩을 하기 전 고려사항
샤딩을 도입하기 전에 다음과 같은 대안을 고려해 볼 수 있습니다.<br>
- 모든 컴포넌트가 하나의 머신에 존재하는 모놀리식 방법을 사용하고 있었을 경우, 별도의 데이터베이스 저장 공간을 사용할 수 있습니다.<br>
- 주로 데이터를 검색할 때 많은 시간이 걸린다면 캐싱을 이용해 이미 요청되었던 결과를 빠르게 반환할 수 있도록 합니다.<br>
- Creating one or more read replicas. Another strategy that can help to improve read performance, this involves copying the data from one database server (the primary server) over to one or more secondary servers. Following this, every new write goes to the primary before being copied over to the secondaries, while reads are made exclusively to the secondary servers. Distributing reads and writes like this keeps any one machine from taking on too much of the load, helping to prevent slowdowns and crashes. Note that creating read replicas involves more computing resources and thus costs more money, which could be a significant constraint for some.
- Upgrading to a larger server. In most cases, scaling up one’s database server to a machine with more resources requires less effort than sharding. As with creating read replicas, an upgraded server with more resources will likely cost more money. Accordingly, you should only go through with resizing if it truly ends up being your best option.


[digital ocean - Understanding Database Sharding](https://www.digitalocean.com/community/tutorials/understanding-database-sharding)<br>
[우아한 형제들 기술 블로그 - DB분산처리를 위한 sharding]("https://techblog.woowahan.com/2687/")<br>
