import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  IChallengeCard,
  ICommandList,
  ICreatingChallenge,
  IListCustomersPersonalChallenge,
  IMembersCommandList,
} from "../../models/IChallenge";
import ChallengeService from "../../services/ChallengeService";
import { showToast } from "../../utils/common-functions";
import { ICreatingPurpose } from "../../models/IPurpose";

const END_DATE = new Date();
END_DATE.setDate(END_DATE.getDate() + 3);

export interface IChallenge {
  creatingChallenge: {
    platform: number;
    title: string;
    description: string;
    type: 1 | 2 | 3;
    image: string;
    startDate: Date;
    endDate: Date;
    team_amount: number;
    max_peoples: number;
    customers: number[];
  };
  disabledButton?: boolean;
  activeChallenges: IChallengeCard[] | [];
  newChalenges: IChallengeCard[] | [];
  isLoading: boolean;
  challenge_id: number;
  challenge: IChallengeCard | null;
  commandList: ICommandList[];
  membersCommandList: IMembersCommandList;
  customers: IListCustomersPersonalChallenge[];
  error: boolean;
}

const initialState: IChallenge = {
  creatingChallenge: {
    platform: 0,
    title: "",
    description: "",
    type: 3,
    image: "",
    startDate: new Date(),
    endDate: END_DATE,
    team_amount: 0,
    max_peoples: 0,
    customers: [],
  },
  disabledButton: true,
  activeChallenges: [],
  newChalenges: [],
  isLoading: false,
  challenge_id: 0,
  challenge: null,
  commandList: [],
  membersCommandList: { customers: [], title: "" },
  customers: [],
  error: false,
};

export const creatingChallenge = createAsyncThunk<unknown>(
  "creatingChallenge",
  async (arg, { getState }) => {
    const state: any = getState();
    const dataChallenge:ICreatingChallenge = {
      description: state.challenges.creatingChallenge.description,
      platform: state.challenges.creatingChallenge.platform,
      title: state.challenges.creatingChallenge.title,
      type: state.challenges.creatingChallenge.type,
      team_amount: state.challenges.creatingChallenge.team_amount,
      max_peoples: state.challenges.creatingChallenge.max_peoples,
      image: state.challenges.creatingChallenge.image,
      start_date:  state.challenges.creatingChallenge.startDate.toLocaleDateString(),
      end_date: state.challenges.creatingChallenge.endDate.toLocaleDateString()
    }
    if(state.challenges.creatingChallenge.type === 3){
      dataChallenge.customers =  JSON.stringify(state.challenges.creatingChallenge.customers)
    }

    try {
      const response = await ChallengeService.creatingChallenge(dataChallenge);
      if (response.data.challenge_id) {
        const dataPurposeChallenge: ICreatingPurpose = {
          challenge: response.data.challenge_id,
          reward: state.purposes.creatingPurpose.reward,
          type: state.purposes.creatingPurpose.type,
          quantity: state.purposes.creatingPurpose.quantity,
        };
        const purposeChallengeResponse = await ChallengeService.creatingPurpose(
          dataPurposeChallenge
        );
        if (purposeChallengeResponse.data.purpose_id) {
          return await response.data.challenge_id;
        } else {
          await showToast("Ошибка создания цели");
        }
      } else {
        await showToast("Ошибка создания");
      }
    } catch (e) {
      console.log(e);
      await showToast("Ошибка создания");
    }
  }
);

export const getListChallenges = createAsyncThunk("challenges", async () => {
  const response = await ChallengeService.getChallenges();
  return await response.data.data;
});

export const getChallengeById = createAsyncThunk(
  "getChallengeById",
  async (id: number) => {
    const response = await ChallengeService.getChallengeById(id);
    return await response.data.data;
  }
);

export const getCommandList = createAsyncThunk(
  "getCommandList",
  async (id: number) => {
    const response = await ChallengeService.getChallengesTeam(id);
    return await response.data.data;
  }
);

export const getMembersCommandList = createAsyncThunk(
  "getMembersCommandList",
  async (id: number) => {
    const response = await ChallengeService.getMembersCommand(id);
    return response.data.data;
  }
);

export const getCustomersPersonalChallenge = createAsyncThunk(
  "getCustomersPersonalChallenge",
  async () => {
    const response = await ChallengeService.customersPersonalChallenge();
    return response.data.data;
  }
);

export const challengeSlice = createSlice({
  name: "challengeSlice",
  initialState,
  reducers: {
    setPlatformChallenge: (state, action) => {
      state.creatingChallenge.platform = action.payload;
    },
    setTypeChallenge: (state, action) => {
      state.creatingChallenge.type = action.payload;
    },
    setStartDateChallenge: (state, action) => {
      state.creatingChallenge.startDate = action.payload;
    },
    setEndDateChallenge: (state, action) => {
      state.creatingChallenge.endDate = action.payload;
    },
    setTitleChallenge: (state, action) => {
      if (action.payload.length <= 65)
        state.creatingChallenge.title = action.payload;
    },
    setDescriptionChallenge: (state, action) => {
      state.creatingChallenge.description = action.payload;
    },
    setMaxPeoplesChallenge: (state, action) => {
      state.creatingChallenge.max_peoples = action.payload;
    },
    setTeamAmountChallenge: (state, action) => {
      state.creatingChallenge.team_amount = action.payload;
    },
    setImageChallenge: (state, action) => {
      state.creatingChallenge.image = action.payload;
    },
    setDisabledButton: (state, action) => {
      state.disabledButton = action.payload;
    },
    setCustomersPersonalChallenge: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.creatingChallenge.customers = [];
      } else {
        if (state.creatingChallenge.customers.includes(action.payload)) {
          state.creatingChallenge.customers =
            state.creatingChallenge.customers.filter(
              (item) => item !== action.payload
            );
        } else {
          state.creatingChallenge.customers = [
            ...state.creatingChallenge.customers,
            action.payload,
          ];
        }
      }
    },
  },
  extraReducers: (builder) => {
    //Получение списка всех челелнджей
    builder.addCase(
      getListChallenges.fulfilled,
      (state, action: PayloadAction<IChallengeCard[]>) => {
        const allChallenges = action.payload;
        state.activeChallenges = allChallenges.filter(
          (challenge) => challenge.active === 1
        );
        state.newChalenges = allChallenges.filter(
          (challenge) => challenge.active === 0
        );
        state.isLoading = false;
      }
    );
    //Включение прелоадера в получении челленджей
    builder.addCase(getListChallenges.pending, (state) => {
      state.isLoading = true;
    });
    //Обработка ошибок в получение списка всех челленджей
    builder.addCase(getListChallenges.rejected, (state) => {
      state.isLoading = false;
      state.activeChallenges = [];
    });
    //Включение прелоадера в создании челленджа
    builder.addCase(creatingChallenge.pending, (state) => {
      state.isLoading = true;
    });
    //Обнуление полей после успешного создания челенджа
    builder.addCase(
      creatingChallenge.fulfilled,
      (state, action: PayloadAction<any>) => {
        const END_DATE = new Date();
        END_DATE.setDate(END_DATE.getDate() + 3);
        state.challenge_id = action.payload;
        state.isLoading = false;
        state.creatingChallenge = {
          platform: 0,
          title: "",
          description: "",
          type: 3,
          image: "",
          startDate: new Date(),
          endDate: END_DATE,
          team_amount: 0,
          max_peoples: 0,
          customers: [],
        };
      }
    );
    //Обработка ошибок в создании челленджа
    builder.addCase(creatingChallenge.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    //Включение прелоадера в получении челленджа по id
    builder.addCase(getChallengeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getChallengeById.fulfilled,
      (state, action: PayloadAction<IChallengeCard>) => {
        state.challenge = action.payload;
        state.isLoading = false;
      }
    );
    //Получение списка доступных команд
    builder.addCase(
      getCommandList.fulfilled,
      (state, action: PayloadAction<ICommandList[]>) => {
        state.commandList = action.payload;
      }
    );
    //Включение прелоадера при получение участников команд
    builder.addCase(getMembersCommandList.pending, (state) => {
      state.isLoading = true;
    });
    //Получение списка участников команды
    builder.addCase(
      getMembersCommandList.fulfilled,
      (state, action: PayloadAction<IMembersCommandList>) => {
        state.membersCommandList = action.payload;
        state.isLoading = false;
      }
    );
    //Включение прелоадера при получении участников личного челенджа
    builder.addCase(getCustomersPersonalChallenge.pending, (state) => {
      state.isLoading = true;
    });
    //Получение участников личного челенджа
    builder.addCase(
      getCustomersPersonalChallenge.fulfilled,
      (state, action: PayloadAction<IListCustomersPersonalChallenge[]>) => {
        state.customers = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const {
  setDescriptionChallenge,
  setDisabledButton,
  setEndDateChallenge,
  setMaxPeoplesChallenge,
  setPlatformChallenge,
  setStartDateChallenge,
  setTeamAmountChallenge,
  setTitleChallenge,
  setTypeChallenge,
  setImageChallenge,
  setCustomersPersonalChallenge,
} = challengeSlice.actions;

export const platformCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.platform;
export const disableButtonChallengeSelector = (state: RootState) =>
  state.challenges.disabledButton;
export const typeCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.type;
export const titleCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.title;
export const descriptionCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.description;
export const imageCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.image;
export const startDateCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.startDate;
export const endDateCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.endDate;
export const maxPeoplesCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.max_peoples;
export const teamAmountCreatingChallengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.team_amount;

export const newChallengesSelector = (state: RootState) =>
  state.challenges.newChalenges;
export const activeChallengesSelector = (state: RootState) =>
  state.challenges.activeChallenges;

export const isLoadingSelector = (state: RootState) =>
  state.challenges.isLoading;

export const challengeIdSelector = (state: RootState) =>
  state.challenges.challenge_id;

export const challengeSelector = (state: RootState) =>
  state.challenges.challenge;
export const commandListSelector = (state: RootState) =>
  state.challenges.commandList;
export const membersCommandListSelector = (state: RootState) =>
  state.challenges.membersCommandList;
export const customersPersonalChallengeSelector = (state: RootState) =>
  state.challenges.customers;
export const customersCreatingChellengeSelector = (state: RootState) =>
  state.challenges.creatingChallenge.customers;
export const errorCreatingChallengeSelector = (state: RootState) =>
  state.challenges.error;
export default challengeSlice.reducer;
