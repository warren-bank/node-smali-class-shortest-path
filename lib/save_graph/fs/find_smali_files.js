const path = require('path')
const fs   = require('fs')

// -----------------------------------------------------------------------------

const find_smali_files = (apk_dirpath) => {
  const smali_root_dirs = get_smali_root_dirs(apk_dirpath)
  const smali_files = []

  if (smali_root_dirs && smali_root_dirs.length) {
    for (let i=0; i < smali_root_dirs.length; i++) {
      const smali_root_dir = smali_root_dirs[i]
      process_smali_dir(smali_root_dir, smali_files)
    }
  }

  return smali_files
}

// -----------------------------------------------------------------------------

const get_smali_root_dirs = (apk_dirpath) => {
  // only search 1 level deep and return directories that begin with 'smali'

  const smali_root_dirs = []
  const fsdirents       = fs.readdirSync(apk_dirpath, {encoding: 'utf8', withFileTypes: true})

  if (!fsdirents || !fsdirents.length)
    return smali_root_dirs

  fsdirents.forEach(fsdirent => {
    if (!fsdirent.isDirectory())
      return

    if (fsdirent.name.indexOf('smali') !== 0)
      return

    smali_root_dirs.push(path.join(apk_dirpath, fsdirent.name))
  })

  return smali_root_dirs
}

// -----------------------------------------------------------------------------

const process_smali_dir = (smali_dir, smali_files) => {
  const fsdirents = fs.readdirSync(smali_dir, {encoding: 'utf8', withFileTypes: true})
  const dirs = []

  if (!fsdirents || !fsdirents.length)
    return

  for (let i=0; i < fsdirents.length; i++) {
    const fsdirent = fsdirents[i]
    const filepath = path.join(smali_dir, fsdirent.name)

    if (fsdirent.isFile() && (path.extname(fsdirent.name) === '.smali')) {
      smali_files.push(filepath)
    }

    if (fsdirent.isDirectory()) {
      dirs.push(filepath)
    }
  }

  for (let i=0; i < dirs.length; i++) {
    const smali_subdir = dirs[i]
    process_smali_dir(smali_subdir, smali_files)
  }
}

// -----------------------------------------------------------------------------

module.exports = find_smali_files
