export interface ResponseInterface {
   results: UserInterface[];
}

export interface UserInterface {
   gender: GenderEnum;
   name: NameInterface;
   email: string;
   dob: DateOfBirthInterface;
   picture: PictureInterface;
   activeState?: 'name' | 'email' | 'dob';
}

export interface DateOfBirthInterface {
   date: string;
   age: number;
}

export enum GenderEnum {
   Female = 'female',
   Male = 'male',
   Any = 'any',
}

export interface NameInterface {
   title: string;
   first: string;
   last: string;
}

export interface PictureInterface {
   large: string;
   medium: string;
   thumbnail: string;
}

export interface UsersDataInterface {
   pageTitle: string;
   genderMdl: string;
   pagination: {
      currentPage: number;
      totalItems: number;
      itemsPerPage: number;
   },
}
