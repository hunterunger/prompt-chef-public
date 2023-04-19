export type InputNamesType = "number" | "text" | "multiple-choice" | "list";

export type InputsConfigType = {
    [key: string]: InputConfigType;
};

export type InputConfigType = {
    type: InputNamesType;
    identifier: string;
    config: {
        title?: string;
        choices?: Array<string>;

        min?: number;
        max?: number;

        max_length?: number;
    };
};

export type InputValuesType = {
    [key: string]: string | string[] | number;
};

export type RecipeType = {
    publicUrl?: string;
    publicDocId?: string;

    name: string;
    id: string;
    description?: string;
    prompt: string;
    themeColorIndex: number;
    coverImageUrl?: string;
    generatorConfig: GeneratorConfigType;
    inputs: InputsConfigType;
};

export type GeneratorConfigType = {
    type: "text" | "image";
    model: ModelType;
};

export type TextModelType = "gpt3" | "gpt4" | "chat-gpt" | "bard";
export type ImageModelType =
    | "stable-diffusion"
    | "stable-diffusion-v1"
    | "stable-diffusion-v1-5"
    | "stable-diffusion-xl-beta-v2-2-2";

export type ModelType = TextModelType | ImageModelType;

export type DatabaseRecipeType = {
    owner: string;
    updatedTimestamp?: any;
    access?: "public" | "private";
    recipe: RecipeType;
};

export type SearchDatabaseRecipeType = {
    owner: string;
    updatedTimestamp: string;
    access: "public" | "private";
    recipe: {
        generatorConfig: GeneratorConfigType;
        themeColorIndex: number;
        name: string;
        id: string;
        prompt: string;
        description?: string;
        coverImageUrl?: string;
        publicDocId: string;
    };
};

export type UserDataType = {
    username: string;
    library: { [key: string]: RecipeType };
    lastLogin: number;
    lastLoginIP?: string;
    secure: {
        special_permission?: any;
        plan: string;
        token_balance: number;
    };
    beta_participant?: boolean;
};
