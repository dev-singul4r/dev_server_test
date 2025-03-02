import CryptoJS from 'crypto-js';
import bcrypt from 'bcrypt';
import ApiAccount from '../models/api_account.js';

export async function compare(str) {
    try {
        // new str inst
        let key = String(str);
    
        // fix str
        const pad = 4 - (key.length % 4);
    
        if (pad !== 4)
            key += '='.repeat(pad);
    
        const fx_key = key.replaceAll('-', '+').replaceAll('_', '/');
    
        // decrypt str
        const fx_key_warr = CryptoJS.enc.Base64.parse(fx_key);
        const dec_key = CryptoJS.enc.Utf8.stringify(fx_key_warr);
    
        // hash pass
        const split_key = dec_key.split(':');
        const username = split_key[0];
        const password = split_key[1];
    
        // get account from db
        const account = await ApiAccount.findOne({ is_active: true, auth_user: username }).exec();

        if (!account)
            throw { message: 'Account not found!' };

        // compare passes
        return await bcrypt.compare(password, account.auth_pass);
    } catch (error) {
        console.error(error.message || 'ApiKey: an unknown error occured!');
        return false;
    }
}
