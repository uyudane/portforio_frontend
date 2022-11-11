import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Grid, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Roadmap, Step, UserState } from 'types';

const RoadmapCard = ({
  roadmap,
  steps,
  user,
}: {
  roadmap: Roadmap;
  steps: Step[];
  user: UserState;
}) => {
  // ロードマップカードタイトルのリンク有無に使用
  const router = useRouter();

  return (
    <Paper sx={{ border: 0.5, p: 1, width: '500px', borderRadius: '16px' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='body1' color='text.secondary'>
            {user.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* ロードマップ作成/編集ページの時はリンクにせず、それ以外の時はリンクにする */}
          {router.pathname === '/roadmap/new' || router.pathname === '/drafts/[id]/edit' ? (
            <Typography
              variant='subtitle1'
              component='a'
              sx={{ mb: 0.5, textDecoration: 'underline' }}
              color='primary'
            >
              {roadmap.title}
            </Typography>
          ) : (
            <Link href={`${user.sub}/roadmaps/${roadmap.id}`}>
              <Typography
                variant='subtitle1'
                component='a'
                sx={{ mb: 0.5, textDecoration: 'underline', cursor: 'pointer' }}
                color='primary'
              >
                {roadmap.title}
              </Typography>
            </Link>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' sx={{ mb: 1 }} color='text.secondary' lineHeight={1.5}>
            開始時スキル: {roadmap.start_skill.slice(0, 50)}
            <br />
            終了時スキル: {roadmap.end_skill.slice(0, 50)}
            <br />
            総ステップ数: {steps.length}
            <br />
            概要: {roadmap.introduction.slice(0, 100)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>
            タグ:{' '}
            {roadmap.tags
              .map((tag) => tag.name)
              .join(',')
              .slice(0, 50)}
          </Typography>
        </Grid>
        <Grid container direction='row' justifyContent='flex-end' alignItems='flex-end'>
          <Grid item>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon fontSize='small' />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon fontSize='small' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoadmapCard;
