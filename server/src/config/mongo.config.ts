import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoUrl(configService),
        ...getMongoOprions()
    }
}

const getMongoUrl = (cfgService: ConfigService): string => {
    return 'mongodb://' +
        cfgService.get('MONGO_LOGIN') +
        ':' +
        cfgService.get('MONGO_PASSWORD') +
        '@' +
        cfgService.get('MONGO_HOST') +
        ':' +
        cfgService.get('MONGO_PORT') +
        '/' +
        cfgService.get('MONGO_AUTHDATABASE');
}

const getMongoOprions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true
})