const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'hjbrain.iptime.org',
  database: 'irup',
  password: 'qhdtncjswo',
  port: 6543,
});

async function run() {
  try {
    await pool.connect();
    console.log('Connected successfully to PostgreSQL');

    // 뉴스 데이터 조회 API
    app.get('/api/users', async (req, res) => {
      try {
        const usersData = await pool.query('SELECT * FROM News."User";');
        res.json(usersData.rows);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users data', error });
      }
    });

    app.get('/api/keywordGroup/:userid', async (req, res) => {
      try {
        const userid = req.params.userid;
        const keywordGroupsData = await pool.query(
          'SELECT groupid, groupname FROM News.Keyword_Group WHERE userid = $1;',
          [userid],
        );

        if (keywordGroupsData.rows.length > 0) {
          res.json(keywordGroupsData.rows);
        } else {
          res
            .status(404)
            .json({ message: 'No keyword groups found for this user' });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error fetching keyword groups data', error });
      }
    });


    app.delete('/api/removeGroup/:userid/:groupName', async (req, res) => {
      try {
        const { userid, groupName } = req.params;
        const deleteResult = await pool.query(
          'DELETE FROM News.Keyword_Group WHERE userid = $1 AND groupname = $2',
          [userid, groupName],
        );

        if (deleteResult.rowCount > 0) {
          res.json({ message: 'Keyword group successfully deleted' });
        } else {
          // 삭제할 데이터가 없는 경우
          res.status(404).json({ message: 'Keyword group not found' });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error deleting keyword group', error });
      }
    });

    app.get('/api/keyword/:userid/:GroupName/', async (req, res) => {
      const { userid, GroupName } = req.params;

      try {
        // News.keyword 테이블에서 userid와 GroupName이 일치하는 행을 조회합니다.
        const keywordGroupsData = await pool.query(
          'SELECT * FROM News.keyword WHERE userid = $1 AND groupname = $2',
          [userid, GroupName],
        );

        if (keywordGroupsData.rows.length > 0) {
          res.json(keywordGroupsData.rows);
        } else {
          res
            .status(404)
            .json({
              message: 'No keyword groups found for this user and GroupName',
            });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: 'Error fetching keyword groups data', error });
      }
    });

    app.get('/api/news/:userid/:keywordid', async (req, res) => {
      try {
        const { userid, keywordid } = req.params;

        const keywordData = await pool.query(
           'SELECT word FROM News.keyword WHERE keywordid = $1 AND userid = $2',
           [keywordid, userid]
        );

        if (keywordData.rows.length > 0) {
          const selectWord = keywordData.rows[0].word; // word 필드 추출
          const newsData = await pool.query(
             'SELECT * FROM News.news WHERE title LIKE $1',
             [`%${selectWord}%`]
          );

          if (newsData.rows.length > 0) {
            res.json(newsData.rows);
          } else {
            res.json(null);
          }
        } else {
          res.json(null);
        }

      } catch (error) {
        res.status(500).json({ message: 'Error fetching news data', error });
      }
    });

    app.get('/api/groupNewsSearch/:userid/:Groupid', async (req, res) => {
      const { userid, Groupid } = req.params;

      try {
        const keywordData = await pool.query(
           'SELECT word FROM News.keyword WHERE groupid = $1 AND userid = $2',
           [Groupid, userid]
        );

        if (keywordData.rows.length > 0) {
          const keywords = keywordData.rows.map((row) => row.word);

          const newsData = await pool.query(
             'SELECT * FROM News.news WHERE title LIKE ANY($1)',
             [keywords.map((keyword) => `%${keyword}%`)]
          );

          if (newsData.rows.length > 0) {
            res.json(newsData.rows);
          } else {
            res.json(null);
          }
        } else {
          res.status(404).json({
            message: 'No keyword groups found for this user and GroupName',
          });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching keyword groups data', error });
      }
    });


    app.get('/api/group/:userid/:Groupid', async (req, res) => {
      const { userid, Groupid } = req.params;

      try {
        const keywordGroupsData = await pool.query(
           'SELECT groupname FROM News.keyword_group WHERE userid = $1 AND groupid = $2',
           [userid, Groupid],
        );

        if (keywordGroupsData.rows.length > 0) {
          res.json(keywordGroupsData.rows);
        } else {
          res
          .status(404)
          .json({
            message: 'No keyword groups found for this user and GroupName',
          });
        }
      } catch (error) {
        res
        .status(500)
        .json({ message: 'Error fetching keyword groups data', error });
      }
    });





    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
}

run().catch(console.dir);
