import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Box } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil'; // Auth0の認証情報をグローバルステートに保存
import tokenState from '../recoil/atoms/tokenState'; // Auth0の認証情報をグローバルステートに保存
import userState from '../recoil/atoms/userState'; // Auth0の認証情報をグローバルステートに保存
import Meta from 'component/Meta';
import RoadmapCard from 'component/RoadmapCard';
import SearchModeTabs from 'component/SearchModeTabs';
import useSearchRoadmaps from 'hooks/useSearchRoadmaps';
import { getRoadmaps } from 'services/roadmaps';
import { getTags } from 'services/tags';
import { getMyUser } from 'services/users';
import { RoadmapFullData, Tag } from 'types';

type Props = {
  roadmaps: RoadmapFullData[];
  tags: Tag[];
};

const Home: NextPage<Props> = ({ roadmaps, tags }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const [searchTags, setSearchTags] = useState<Tag[] | undefined>();
  const [freeSearchWord, setFreeSearchWord] = useState<string | undefined>();

  useEffect(() => {
    const getToken = async () => {
      try {
        // ログイン完了後にトークンを取得しRecoilへ格納
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
        const user_data = await getMyUser(accessToken);
        // ログイン完了後に自身の情報をバックエンドから取得してrecoilへ格納
        // ユーザ登録の場合は、このタイミングでバックエンドに情報が追加される
        setUser({ sub: user_data.sub, name: user_data.name, avatar: user_data.avatar });
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };
    getToken();
  }, []);

  const outputRoadmap = useSearchRoadmaps({ ...{ roadmaps, searchTags, freeSearchWord } });

  return (
    <>
      <Meta pageTitle='トップ' />
      <SearchModeTabs {...{ setFreeSearchWord, setSearchTags, tags }} />
      <br />
      <Grid container direction='row' spacing={2}>
        {outputRoadmap.map((roadmap: RoadmapFullData, i: number) => (
          <Grid item xs={6} key={`roadmap-card${i}`}>
            <Box display='flex' justifyContent='center'>
              <RoadmapCard roadmap={roadmap} steps={roadmap.steps} user={roadmap.user} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export const getServerSideProps = async () => {
  const roadmaps = await getRoadmaps();
  const tags = await getTags();

  return { props: { ...{ roadmaps, tags } } };
};

export default Home;
