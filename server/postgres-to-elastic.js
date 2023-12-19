'use strict'

const { Client } = require('@elastic/elasticsearch');
const { Pool } = require('pg');

// PostgreSQL 접속 설정
const pgClient = new Pool({
  user: 'postgres',
  host: 'hjbrain.iptime.org',
  database: 'postgres',
  password: 'qhdtncjswo',
  port: 6543,
});

const esClient = new Client({
  node: 'http://localhost:9200',
});

const fetchDataFromPostgres = async () => {
  const res = await pgClient.query('SELECT * FROM rider.weekly_promotion');
  return res.rows;
};

const indexDataToElasticsearch = async (data) => {
  for (const item of data) {
    await esClient.index({
      index: 'rider',
      body: item,
    });
  }
};

// Elasticsearch에서 데이터 검색
const searchDataFromElasticsearch = async () => {
	try {
		const body = await esClient.search({
			index: 'rider',
			q: 'promotion_detail:*5만원*' // 검색하고자 하는 단어
		});

		return body.hits.hits;
	} catch (error) {
		console.error('An error occurred while searching Elasticsearch:', error);
		throw error; // 에러를 다시 던져서 상위 코드에서 처리할 수 있도록 합니다.
	}
};

// 데이터 동기화 및 검색을 수행하는 메인 함수
const main = async () => {
  try {
	  // Elasticsearch 인덱스 목록 출력
    // PostgreSQL에서 데이터 가져오기
    // const data = await fetchDataFromPostgres();

    // 가져온 데이터를 Elasticsearch에 색인화
    // await indexDataToElasticsearch(data);

    // Elasticsearch에서 데이터 검색
    const searchData = await searchDataFromElasticsearch();
    console.log(searchData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
