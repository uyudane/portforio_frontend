import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tokenState from 'recoil/atoms/tokenState';
import userState from 'recoil/atoms/userState';
import { deleteRoadmap } from 'services/roadmaps';

const RoadmapEditDeleteButton = ({ roadmap }: any) => {
  const current_user = useRecoilValue(userState);
  const [edit, setEdit] = useState<boolean>(false);
  const router = useRouter();
  // 「Hydration failed」(CSRとSSG/SSRの間で作成されるDOMに差異)のエラーが出るため、useEffectで設定する。
  useEffect(() => {
    setEdit(roadmap.user.sub == current_user.sub);
  }, []);

  // 削除確認ダイアログに使用
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const token = useRecoilValue(tokenState);

  const execDeleteRoadmap = async () => {
    const result = await deleteRoadmap(roadmap.id, token);
    if (result === 'OK') {
      router.push({
        pathname: `/`,
        query: { successMessage: 'ロードマップを削除しました' },
      });
    }
  };

  return (
    <>
      {edit && (
        <>
          <Button
            variant='outlined'
            onClick={() => {
              router.push(`/drafts/${roadmap.id}/edit`);
            }}
          >
            <EditIcon />
          </Button>
          <Button variant='outlined' onClick={handleClickOpen}>
            <DeleteIcon />
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'削除確認'}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                ロードマップを削除しますか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button onClick={execDeleteRoadmap} autoFocus>
                削除する
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default RoadmapEditDeleteButton;
