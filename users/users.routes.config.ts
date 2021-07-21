import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {
        
        this.app.route(`/users`)
            // .get(
            //     jwtMiddleware.validJWTNeeded,
            //     permissionMiddleware.permissionFlagRequired(
            //         PermissionFlag.ADMIN_PERMISSION
            //     ),
            //     UsersController.listUsers
            // )
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(
                UsersMiddleware.validateUserExists,
                jwtMiddleware.validJWTNeeded
            )
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);
        
        // this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
        //     jwtMiddleware.validJWTNeeded,
        //     permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        
        //     // Note: The above two pieces of middleware are needed despite
        //     // the reference to them in the .all() call, because that only covers
        //     // /users/:userId, not anything beneath it in the hierarchy
        
        //     permissionMiddleware.permissionFlagRequired(
        //         PermissionFlag.FREE_PERMISSION
        //     ),
        //     UsersController.updatePermissionFlags,
        // ]);

        return this.app;
    }
}