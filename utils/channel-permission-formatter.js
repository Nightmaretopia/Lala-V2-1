/**
 * Formats and compares channels' permission info.
 * @param {GuildChannel} firstChannel
 * @param {GuildChannel} secondChannel
 */
function formatChannelPermission(firstChannel, secondChannel) {
    if (JSON.stringify(firstChannel.permissionOverwrites.cache) === JSON.stringify(secondChannel.permissionOverwrites.cache)) return;

    /**
     * All permissions of {@link firstChannel} but in formatted form.
     * @type {Collection<string, {holder: (Role|GuildMember), overwrites: Map<string, boolean>, empty: boolean}>}
     */
    const firstPermissions = formatPermission(firstChannel);
    /**
     * All permissions of {@link secondChannel} but in formatted form.
     * @type {Collection<string, {holder: (Role|GuildMember), overwrites: Map<string, boolean>, empty: boolean}>}
     */
    const secondPermissions = formatPermission(secondChannel);

    /**
     * All holders of {@link firstChannel}.
     * @type {(Role | GuildMember)[]}

     */
    const firstHolders = firstPermissions.map(permission => permission.holder);
    /**
     * All holders of {@link secondChannel}.
     * @type {(Role | GuildMember)[]}

     */
    const secondHolders = secondPermissions.map(permission => permission.holder);
    /**
     * All permission holders.
     * @type {(Role | GuildMember)[]}

     */
    const allHolders = Array.from(new Set([...firstHolders, ...secondHolders]));

    /**
     * All permissions of {@link firstChannel} and {@link secondChannel} combined.
     *
     * <h3>Structure:
     *
     * <li>The key is the holder.
     * <li>The value is a {@link Collection}.
     * <li>The {@link Collection}'s type: `<string, [(boolean|null), (boolean|null)]>`.
     *
     * <h3>Key:
     *
     * <li>The string is {@link PermissionString}. The overwrite set.
     *
     * <h3>Value:
     *
     * <li>The first boolean means did the overwrite set in {@link firstChannel}.
     * <li>The first boolean means did the overwrite set in {@link secondChannel}.
     * @type {Collection<(Role|GuildMember), Collection<string, [(boolean|null), (boolean|null)]>>}

     */
    const formattedPermissions = new Collection();

    allHolders.forEach(holder => {
        /**
         * @type {Map<string, boolean>|null}

         */
        const firstPermission = firstPermissions.get(holder.id)?.overwrites ?? null;
        /**
         * @type {Map<string, boolean>|null}

         */
        const secondPermission = secondPermissions.get(holder.id)?.overwrites ?? null;
        /**
         * @type {Collection<string, [(boolean|null), (boolean|null)]>}

         */
        const permissionMap = new Collection(FLAG_KEYS.map(permFlag => [permFlag, [null, null]]));

        if (firstPermission) firstPermission.forEach((allow, permFlag) => permissionMap.get(permFlag)[0] = allow);
        if (secondPermission) secondPermission.forEach((allow, permFlag) => permissionMap.get(permFlag)[1] = allow);

        formattedPermissions.set(holder, permissionMap);
    });

    const newCreatedHolders = new Map(secondHolders.filter(holder => !firstHolders.includes(holder)).map(holder => [holder, [false, true]]));
    const newRemovedHolders = new Map(firstHolders.filter(holder => !secondHolders.includes(holder)).map(holder => [[], holder]));

    /**
     * All holders but formatted.
     *
     * <h3>Structure:
     *
     * <li>The key is the holder.
     * <li>The value is a tuple.
     * <li>The tuple's structure: [boolean, boolean].
     *
     * <h3>Tuple:
     *
     * <li>The first boolean means does the holder exists in {@link firstChannel}.
     * <li>The second boolean means does the holder exists in {@link secondChannel}.
     * @type {Map<Role|GuildMember, [boolean, boolean]>}

     */
    const formattedHolders = new Map(newCreatedHolders);

    newRemovedHolders.forEach(holder => formattedHolders.set(holder, [true, false]));
    allHolders.forEach(holder => {
        if (!formattedHolders.has(holder)) {
            formattedHolders.set(holder, [true, true]);
        }
    });

    return {
        /**
         * All info about permissions.
         */
        permissions: {
            first: firstPermissions,
            second: secondPermissions,
            formatted: formattedPermissions,
        },
        /**
         * All info about permission holders.
         */
        holders: {
            all: allHolders,
            first: firstHolders,
            second: secondHolders,
            formatted: formattedHolders,
        }
    };
}

/**
 *
 * @param {GuildChannel} channel
 * @return {Collection<string, {
 *      holder: Role|GuildMember;
 *      overwrites: Map<string, boolean>;
 *      empty: boolean;
 * }>}
 */
function formatPermission(channel) {
    const permissions = new Collection();

    channel.permissionOverwrites.cache.forEach((permission, id) => {
        const holder = getHolder(permission, channel.guild);
        const overwrites = new Collection();

        const allowed = permission.allow.toArray();
        const denied = permission.deny.toArray();
        const empty = !allowed.length && !denied.length;

        // we do a bit of mirco-optimization
        if (!empty) {
            allowed.forEach((permFlag) => overwrites.set(permFlag, true));
            denied.forEach((permFlag) => overwrites.set(permFlag, false));
        }

        permissions.set(id, { holder, overwrites, empty });
    });

    return permissions;
}

/**
 *
 * @param {PermissionOverwrites} permission
 * @param {Guild} guild
 * @return {Role|GuildMember}

 * @throws {Error} If `permission.type` isn't `'member'` or `'role'`.
 */
function getHolder(permission, guild) {
    const holder = permission.type === 'member' ? guild.members.cache.get(permission.id) :
        permission.type === 'role' ? guild.roles.cache.get(permission.id) : null;
    if (holder === null) throw new Error(`Unexpected type: ${permission.type}`);
    return holder;
}
