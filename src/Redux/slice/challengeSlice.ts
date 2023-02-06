import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  IChallengeCard,
  ICommandList,
  IMembersCommandList,
} from "../../models/IChallenge";
import ChallengeService from "../../services/ChallengeService";

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
  };
  disabledButton?: boolean;
  activeChallenges: IChallengeCard[] | [];
  newChalenges: IChallengeCard[] | [];
  isLoading: boolean;
  challenge_id: number;
  challenge: IChallengeCard | null;
  commandList: ICommandList[];
  membersCommandList: IMembersCommandList;
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
  },
  disabledButton: true,
  activeChallenges: [],
  newChalenges: [],
  isLoading: false,
  challenge_id: 0,
  challenge: null,
  commandList: [],
  membersCommandList: { customers: [], title: "" },
};

export const creatingChallenge = createAsyncThunk<unknown>(
  "creatingChallenge",
  async (arg, { getState }) => {
    const state: any = getState();
    const formData = new FormData();
    formData.append("platform", state.challenges.creatingChallenge.platform);
    formData.append("title", state.challenges.creatingChallenge.title);
    formData.append(
      "description",
      state.challenges.creatingChallenge.description
    );
    formData.append("type", state.challenges.creatingChallenge.type);
    formData.append("image", state.challenges.creatingChallenge.image);
    formData.append(
      "start_date",
      state.challenges.creatingChallenge.startDate.toLocaleDateString()
    );
    formData.append(
      "end_date",
      state.challenges.creatingChallenge.endDate.toLocaleDateString()
    );
    formData.append(
      "team_amount",
      state.challenges.creatingChallenge.team_amount
    );
    formData.append(
      "max_peoples",
      state.challenges.creatingChallenge.max_peoples
    );
    try {
      const response = await ChallengeService.creatingChallenge(formData);

      const formDataPurpose = new FormData();
      formDataPurpose.append(
        "quantity",
        state.purposes.creatingPurpose.quantity
      );
      formDataPurpose.append("type", state.purposes.creatingPurpose.type);
      formDataPurpose.append("reward", state.purposes.creatingPurpose.reward);
      formDataPurpose.append("challenge", response.data.challenge_id);

      await ChallengeService.creatingPurpose(formDataPurpose);
      return await response.data.challenge_id;
    } catch (e) {
      console.log(e);
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
      if (action.payload.length <= 180)
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
  },
  extraReducers: (builder) => {
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
    builder.addCase(getListChallenges.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListChallenges.rejected, (state) => {
      state.isLoading = false;
      state.activeChallenges = [];
    });
    builder.addCase(creatingChallenge.pending, (state) => {
      state.isLoading = true;
    });
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
        };
      }
    );
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
    builder.addCase(
      getCommandList.fulfilled,
      (state, action: PayloadAction<ICommandList[]>) => {
        state.commandList = action.payload;
      }
    );
    builder.addCase(
      getMembersCommandList.pending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      getMembersCommandList.fulfilled,
      (state, action: PayloadAction<IMembersCommandList>) => {
        state.membersCommandList = action.payload;
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
export default challengeSlice.reducer;
