// tslint:disable
// this is an auto generated file. This will be overwritten

export const createGame = `mutation CreateGame(
  $input: CreateGameInput!
  $condition: ModelGameConditionInput
) {
  createGame(input: $input, condition: $condition) {
    id
    participants {
      name
      missCount
      progress {
        number
        count
      }
    }
  }
}
`;
export const updateGame = `mutation UpdateGame(
  $input: UpdateGameInput!
  $condition: ModelGameConditionInput
) {
  updateGame(input: $input, condition: $condition) {
    id
    participants {
      name
      missCount
      progress {
        number
        count
      }
    }
  }
}
`;
export const deleteGame = `mutation DeleteGame(
  $input: DeleteGameInput!
  $condition: ModelGameConditionInput
) {
  deleteGame(input: $input, condition: $condition) {
    id
    participants {
      name
      missCount
      progress {
        number
        count
      }
    }
  }
}
`;
