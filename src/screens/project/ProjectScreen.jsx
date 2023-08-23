import {ButtonComponent, Input} from '@components/customize';
import {COLORS} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProject, updateProject} from '@redux/slices/projectSlice';
import {getProjectDetailApi} from '@api/projectApi';
import STATUS from '@constants/status';

const ProjectScreen = ({route}) => {
  const [project, setProject] = React.useState({});
  const {id} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getProjectDetailApi(id, token);
      setProject(res.data.data);
      console.log('status', res.data.data.status);
    } catch (error) {
      Alert.alert('Error', error.data.data.error);
    }
  };

  const updateProjectFunction = value => {
    console.log('value', value);
    const updatedProject = {
      ...project,
      status: value,
    };
    setProject(updatedProject);
    dispatch(updateProject(updatedProject));
    navigation.goBack();
  };
  const deleteProjectFunction = () => {
    Alert.alert('Delete project', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          dispatch(deleteProject(project._id));

          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project?.name}</Text>
      <Text style={styles.description}>{project?.description}</Text>
      <View style={styles.card}>
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeader}>Project details</Text>
          <View style={styles.customer}>
            <Icon name="user" size={20} color="#333" />
            <Text style={styles.detailText}>Customer: {project?.customer}</Text>
          </View>
          <Text style={styles.sectionHeader}>Assignees</Text>
          {project?.assignees?.map((item, index) => (
            <View key={index} style={styles.assigneeItem}>
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${item?.name}&background=random&rounded=true&size=40`,
                }}
                style={styles.avatar}
              />
              <Text style={styles.item}>{item?.name}</Text>
            </View>
          ))}
          <View style={styles.detailItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="tag" size={20} color="#333" />
              <Text style={styles.detailText}>Status: </Text>
            </View>
            <Input
              type="select"
              data={STATUS}
              selectedValue={project?.status}
              onValueChange={value => updateProjectFunction(value)}
              containerStyle={styles.selectStatus}
            />
          </View>
        </View>
      </View>
      <ButtonComponent
        title="Delete project"
        onPress={deleteProjectFunction}
        color={COLORS.DANGER}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  cardSection: {
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  detailItem: {
    flexDirection: 'column',
    marginBottom: 5,
    gap: 5,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  assigneeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  selectStatus: {
    borderWidth: 0,
    backgroundColor: COLORS.WHITE,
  },
  customer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ProjectScreen;
