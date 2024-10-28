// src/components/SettingsList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSettings, deleteSetting, createOrUpdateSetting } from '../../features/settingsSlice';

const SettingsList = () => {
  const dispatch = useDispatch();
  const { settings, loading, error } = useSelector((state) => state.settings);

  // States for adding/updating settings
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Fetch settings on component mount
  useEffect(() => {
    dispatch(fetchAllSettings());
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (key) => {
    dispatch(deleteSetting(key));
  };

  // Handle add/update action
  const handleSave = () => {
    if (key && value) {
      dispatch(createOrUpdateSetting({ key, value }));
      setKey('');
      setValue('');
      setIsUpdateMode(false); // Reset after saving
    }
  };

  // Prepare form for updating
  const handleEdit = (setting) => {
    setKey(setting.key);
    setValue(setting.value);
    setIsUpdateMode(true);
  };

  // Conditional rendering for loading/error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Settings</h1>

      {/* Form for adding/updating settings */}
      <div>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          disabled={isUpdateMode} // Disable key input in update mode to avoid changing keys
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSave}>
          {isUpdateMode ? 'Update Setting' : 'Add Setting'}
        </button>
      </div>

      {/* List of settings */}
      <ul>
        {settings.map((setting) => (
          <li key={setting.key}>
            {setting.key}: {setting.value}
            <button onClick={() => handleEdit(setting)}>Edit</button>
            <button onClick={() => handleDelete(setting.key)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsList;
