import React from "react";

export type INewUser = {
  nickname: string;
  username: string;
  email: string;
  password: string;
};

export type ProjectPhotoProps = {
  id: number;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  imgSrc: string;
};

export type ICurrentUser = {
  id: string;
  username: string;
  email: string;
};
