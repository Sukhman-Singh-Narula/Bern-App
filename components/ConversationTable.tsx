import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '@/constants/Colors';
import { Clock, MessageCircle, Lightbulb, ChevronRight } from 'lucide-react-native';
import ConversationModal from './ConversationModal';

interface Conversation {
  id: string;
  date: string;
  duration: string;
  topic: string;
  insights: string;
  mood: string;
  progress: string;
  performance: string;
  summary: string;
}

interface ConversationTableProps {
  conversations: Conversation[];
}

export function ConversationTable({ conversations }: ConversationTableProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConversationPress = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => handleConversationPress(item)}
    >
      <View style={styles.conversationHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <ChevronRight size={18} color={COLORS.gray[400]} />
      </View>
      
      <View style={styles.topicContainer}>
        <MessageCircle size={18} color={COLORS.primary[600]} />
        <Text style={styles.topicLabel}>Topic:</Text>
        <Text style={styles.topicValue}>{item.topic}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Clock size={16} color={COLORS.gray[500]} />
          <Text style={styles.infoText}>{item.duration}</Text>
        </View>
        
        <View style={[styles.infoItem, styles.insightContainer]}>
          <Lightbulb size={16} color={COLORS.accent[500]} />
          <Text style={styles.infoText} numberOfLines={2}>
            {item.insights}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        scrollEnabled={false}
      />
      
      {selectedConversation && (
        <ConversationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          conversation={selectedConversation}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  conversationItem: {
    paddingVertical: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: COLORS.gray[800],
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topicLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: COLORS.gray[600],
    marginLeft: 6,
    marginRight: 4,
  },
  topicValue: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: COLORS.primary[700],
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContainer: {
    flex: 1,
  },
  infoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: COLORS.gray[600],
    marginLeft: 4,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
});