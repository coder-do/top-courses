import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

class HHData {
    @prop()
    count: number;

    @prop()
    juniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;
}

class TopPageAdvantages {
    @prop()
    title: string;

    @prop()
    description: string;
}

export interface TopPageModel extends Base { }
export class TopPageModel extends TimeStamps {
    @prop({ enum: TopLevelCategory })
    firstCategory: TopLevelCategory;

    @prop()
    secondCategory: string;

    @prop()
    title: string;

    @prop({ unique: true })
    alias: string;

    @prop()
    category: string;

    @prop({ type: () => HHData })
    hh?: HHData

    @prop({ type: () => [TopPageAdvantages] })
    advantages: TopPageAdvantages[]

    @prop()
    seoText: string;

    @prop()
    tagsTitle: string;

    @prop({ type: () => [String] })
    tags: string[];
}
