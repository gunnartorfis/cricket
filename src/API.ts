/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  id?: string | null,
  participants?: Array< ParticipantInput | null > | null,
};

export type ParticipantInput = {
  name: string,
  missCount: number,
  progress?: Array< UserProgressInput | null > | null,
};

export type UserProgressInput = {
  number: string,
  count: number,
};

export type ModelGameConditionInput = {
  and?: Array< ModelGameConditionInput | null > | null,
  or?: Array< ModelGameConditionInput | null > | null,
  not?: ModelGameConditionInput | null,
};

export type UpdateGameInput = {
  id: string,
  participants?: Array< ParticipantInput | null > | null,
};

export type DeleteGameInput = {
  id?: string | null,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelGameFilterInput | null > | null,
  or?: Array< ModelGameFilterInput | null > | null,
  not?: ModelGameFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CreateGameMutationVariables = {
  input: CreateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type CreateGameMutation = {
  createGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type UpdateGameMutation = {
  updateGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput,
  condition?: ModelGameConditionInput | null,
};

export type DeleteGameMutation = {
  deleteGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames:  {
    __typename: "ModelGameConnection",
    items:  Array< {
      __typename: "Game",
      id: string,
      participants:  Array< {
        __typename: "Participant",
        name: string,
        missCount: number,
        progress:  Array< {
          __typename: "UserProgress",
          number: string,
          count: number,
        } | null > | null,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateGameSubscription = {
  onCreateGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame:  {
    __typename: "Game",
    id: string,
    participants:  Array< {
      __typename: "Participant",
      name: string,
      missCount: number,
      progress:  Array< {
        __typename: "UserProgress",
        number: string,
        count: number,
      } | null > | null,
    } | null > | null,
  } | null,
};
