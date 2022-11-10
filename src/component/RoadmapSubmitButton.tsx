import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import roadmapState from 'recoil/atoms/roadmapState';
import stepsState from 'recoil/atoms/stepsState';
import tokenState from 'recoil/atoms/tokenState';
import { postRoadmap, editRoadmap } from 'services/roadmaps';

const RoadmapSubmitButton = () => {
  const router = useRouter();
  const token = useRecoilValue(tokenState);
  const roadmap = useRecoilValue(roadmapState);
  const steps = useRecoilValue(stepsState);
  const resetRoadmap = useResetRecoilState(roadmapState);
  const resetSteps = useResetRecoilState(stepsState);
  const execPostRoadmap = async () => {
    const result = await postRoadmap(
      {
        title: roadmap.title,
        tags: roadmap.tags,
        introduction: roadmap.introduction,
        start_skill: roadmap.start_skill,
        end_skill: roadmap.end_skill,
        steps: steps,
        is_published: true,
      },
      token,
    );
    return result;
  };

  const execEditRoadmap = async () => {
    const result = await editRoadmap(
      {
        id: roadmap.id,
        title: roadmap.title,
        tags: roadmap.tags,
        introduction: roadmap.introduction,
        start_skill: roadmap.start_skill,
        end_skill: roadmap.end_skill,
        steps: steps,
        is_published: true,
      },
      token,
    );
    return result;
  };

  const execSubmit = async () => {
    let result = '';
    switch (router.pathname) {
      case '/roadmap/new':
        result = (await execPostRoadmap()) as any;
        break;
      case '/drafts/[id]/edit':
        result = (await execEditRoadmap()) as any;
        break;
      default:
        // リファクト必要
        console.log('エラー');
        return;
    }
    if (result === 'OK') {
      resetRoadmap();
      resetSteps();
      router.push({
        pathname: `/`,
        query: { successMessage: 'ロードマップを投稿しました' },
      });
    }
  };

  return (
    <>
      <Button color='secondary' variant='contained' onClick={execSubmit}>
        投稿する
      </Button>
    </>
  );
};

export default RoadmapSubmitButton;
