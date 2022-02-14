/* eslint-disable no-useless-escape */
export const millisToMinsAndSecs = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return Number(seconds) === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

export const pathName = (path: string) => {
  const tmp = path.replace(/^[\.]+/, '');
  if (/\./.test(tmp)) {
    return tmp.match(/\.[^.]*$/)![0];
  }
  return '';
};

export const getNamePicture = (item: any, user: any) => {
  if (item.channel_participants.length === 2) {
    const person = item.channel_participants.filter(
      (el: any) => el.user_id !== user.id,
    );
    return {
      name: person[0]?.user?.userdetail?.name,
      picture: person[0]?.user?.userdetail?.picture,
    };
  }
  return { name: item.name, picture: item.image };
};

export const getOnlineStatus = (convo: any, user: any, onlineUsers: any) => {
  if (convo.channel_participants.length === 2) {
    const person = convo.channel_participants.filter(
      (el: any) => el.user_id !== user.id,
    );

    if (onlineUsers.find((el: any) => el.userId === person[0].user_id)) {
      return 'Çevrimiçi';
    }
    return 'Çevrimdışı';
  }
  return null;
};

// TODO test pathname function
